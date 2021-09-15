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
            this._utilityService.getFigureCoordinatesByIndex(fromIndex);
        const toCoordinates =
            this._utilityService.getFigureCoordinatesByIndex(toIndex);

        console.log(
            `From: ${fromCoordinates.x}:${fromCoordinates.y}; To ${toCoordinates.x}:${toCoordinates.y} `
        );

        const move = new ChessMove(fromCoordinates, toCoordinates);

        // TODO: implement checks: is my/opponents King under attack before/after move,
        //  is there at least one possible move.
        return (
            this._isTargetSquareValid(figure, targetSquare) &&
            this._isFigureCanMove(figure, move)
        );
    }

    private _isFigureCanMove(figure: string, move: ChessMove): boolean {
        switch (figure) {
            case FENKey.WhiteKing:
            case FENKey.BlackKing:
                return this._isKingCanMove(move);

            case FENKey.WhiteQueen:
            case FENKey.BlackQueen:
                return this._isQueenCanMove(move);

            case FENKey.BlackBishop:
            case FENKey.WhiteBishop:
                return this._isBishopCanMove(move);

            case FENKey.BlackKnight:
            case FENKey.WhiteKnight:
                return this._isKnightCanMove(move);

            case FENKey.WhiteRook:
            case FENKey.BlackRook:
                return this._isRookCanMove(move);

            case FENKey.WhitePawn:
            case FENKey.BlackPawn:
                return this._isPawnCanMove(move);
        }

        return true;
    }

    private _isTargetSquareValid(figure: FENKey, targetSquare: FENKey) {
        let isTargetSquareValid = true;

        if (targetSquare !== FENKey.Empty) {
            const isFigureWhite = figure == figure.toUpperCase();
            const isTargetFigureWhite =
                targetSquare == targetSquare.toUpperCase();

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

    private _isBishopCanMove(move: ChessMove) {
        return move.AbsDeltaX === move.AbsDeltaY;
    }

    private _isRookCanMove(move: ChessMove) {
        return (
            (!move.AbsDeltaX && !!move.AbsDeltaY) ||
            (!!move.AbsDeltaX && !move.AbsDeltaY)
        );
    }

    private _isQueenCanMove(move: ChessMove) {
        return this._isBishopCanMove(move) || this._isRookCanMove(move);
    }

    private _isPawnCanMove(move: ChessMove) {
        const isTwoSquareMovePossible = [1, 6].includes(move.From.y);

        return (
            move.AbsDeltaY <= (isTwoSquareMovePossible ? 2 : 1) &&
            move.DeltaX === 0
        );
    }
}
