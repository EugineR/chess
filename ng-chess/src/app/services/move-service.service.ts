import { Injectable } from '@angular/core';

import { FENKey } from '@constants/figure.enum';
import { UtilityService } from '@services/utility.service';
import { ChessMove } from '@classes/move.class';

@Injectable()
export class MoveService {
    constructor(private readonly _utilityService: UtilityService) {}

    isMoveValid(fen: string[], fromIndex: number, toIndex: number): boolean {
        if (fromIndex === toIndex) {
            return false;
        }

        const figure = fen[fromIndex] as FENKey;
        const targetSquare = fen[toIndex] as FENKey;

        const fromCoordinates =
            this._utilityService.getCoordinatesByIndex(fromIndex);
        const toCoordinates =
            this._utilityService.getCoordinatesByIndex(toIndex);

        console.log(
            `From: ${fromCoordinates.x}:${fromCoordinates.y}; To ${toCoordinates.x}:${toCoordinates.y} `
        );

        const move = new ChessMove(
            fromCoordinates,
            toCoordinates,
            fromIndex,
            toIndex
        );

        // TODO: implement checks: is my/opponents King under attack before/after move,
        //  is there at least one possible move.
        return (
            this._isTargetSquareValid(figure, targetSquare) &&
            this._isFigureCanMove(fen, figure, move)
        );
    }

    private _isFigureCanMove(
        fen: string[],
        figure: string,
        move: ChessMove
    ): boolean {
        switch (figure) {
            case FENKey.WhiteKing:
            case FENKey.BlackKing:
                return this._isKingCanMove(move);

            case FENKey.WhiteQueen:
            case FENKey.BlackQueen:
                return this._isQueenCanMove(fen, move);

            case FENKey.BlackBishop:
            case FENKey.WhiteBishop:
                return this._isBishopCanMove(fen, move);

            case FENKey.BlackKnight:
            case FENKey.WhiteKnight:
                return this._isKnightCanMove(move);

            case FENKey.WhiteRook:
            case FENKey.BlackRook:
                return this._isRookCanMove(fen, move);

            case FENKey.WhitePawn:
            case FENKey.BlackPawn:
                return this._isPawnCanMove(fen, move);
        }

        return true;
    }

    private _isTargetSquareValid(figure: FENKey, targetSquare: FENKey) {
        let isTargetSquareValid = true;

        if (targetSquare !== FENKey.Empty) {
            const isFigureWhite = this._utilityService.isWhiteFigure(figure);
            const isTargetFigureWhite =
                this._utilityService.isWhiteFigure(targetSquare);

            isTargetSquareValid = isFigureWhite !== isTargetFigureWhite;
        }

        return isTargetSquareValid;
    }

    private _isKingCanMove(move: ChessMove) {
        return move.AbsDeltaX <= 1 && move.AbsDeltaY <= 1;
    }

    private _isKnightCanMove(move: ChessMove) {
        return (
            (move.AbsDeltaX === 1 && move.AbsDeltaY === 2) ||
            (move.AbsDeltaX === 2 && move.AbsDeltaY === 1)
        );
    }

    private _isBishopCanMove(fen: string[], move: ChessMove) {
        return (
            this._canMoveStraight(fen, move) &&
            move.SignY !== 0 &&
            move.SignX !== 0
        );
    }

    private _isRookCanMove(fen: string[], move: ChessMove) {
        return (
            this._canMoveStraight(fen, move) &&
            (move.SignY === 0 || move.SignX === 0)
        );
    }

    private _isQueenCanMove(fen: string[], move: ChessMove) {
        return this._canMoveStraight(fen, move);
    }

    private _isPawnCanMove(fen: string[], move: ChessMove) {
        const isWhiteFigureMoving = this._utilityService.isWhiteFigure(
            fen[move.FromIndex] as FENKey
        );

        const isSignValid = isWhiteFigureMoving
            ? move.DeltaY < 0
            : move.DeltaY > 0;

        return (
            isSignValid &&
            (this._isPawnAbleToMoveForward(fen, move) ||
                this._isPawnAbleToAttack(fen, move))
        );
    }

    private _canMoveStraight(fen: string[], move: ChessMove) {
        let tempCoordinates = { ...move.From };

        do {
            tempCoordinates = {
                x: tempCoordinates.x + move.SignX,
                y: tempCoordinates.y + move.SignY
            };
            if (
                tempCoordinates.x === move.To.x &&
                tempCoordinates.y === move.To.y
            ) {
                return true;
            }
        } while (
            this._utilityService.isCoordinatesOnBoard(tempCoordinates) &&
            fen[this._utilityService.getIndexByCoordinates(tempCoordinates)] ===
                FENKey.Empty
        );

        return false;
    }

    private _isPawnAbleToMoveForward(fen: string[], move: ChessMove) {
        const isTwoSquareMovePossible = [1, 6].includes(move.From.y);

        return (
            move.AbsDeltaY <= (isTwoSquareMovePossible ? 2 : 1) &&
            move.DeltaX === 0 &&
            fen[move.ToIndex] === FENKey.Empty
        );
    }

    private _isPawnAbleToAttack(fen: string[], move: ChessMove) {
        const isWhiteFigureMoving = this._utilityService.isWhiteFigure(
            fen[move.FromIndex] as FENKey
        );
        const isWhiteTargetFigure = this._utilityService.isWhiteFigure(
            fen[move.ToIndex] as FENKey
        );

        return (
            move.AbsDeltaX === 1 &&
            move.AbsDeltaY === 1 &&
            isWhiteTargetFigure !== isWhiteFigureMoving &&
            fen[move.ToIndex] !== FENKey.Empty
        );
    }
}
