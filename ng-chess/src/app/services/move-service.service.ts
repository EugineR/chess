import { Injectable } from '@angular/core';

import { FENKey } from '@constants/figure.enum';
import { UtilityService } from '@services/utility.service';
import { ChessMove } from '@classes/move.class';
import { FigureColor } from '@constants/figure-color.enum';

@Injectable()
export class MoveService {
    constructor(private readonly _utilityService: UtilityService) {}

    isMoveValid(
        squares: string[],
        fromIndex: number,
        toIndex: number
    ): boolean {
        if (fromIndex === toIndex) {
            return false;
        }

        const move = this.getMoveByIndexes(fromIndex, toIndex);

        // TODO: implement checks: is my/opponents King under attack before/after move,
        //  is there at least one possible move.
        return (
            this._isFigureCanMoveWrapper(squares, move) &&
            !this._isCheck(squares, move)
        );
    }

    private _isCheck(squares: string[], mainMove: ChessMove): boolean {
        const color = this._utilityService.getColorOfTheFigure(
            squares[mainMove.fromIndex] as FENKey
        );

        const squaresAfterMove = this.getSquaresAfterSwap(
            squares,
            mainMove.fromIndex,
            mainMove.toIndex
        );

        const enemyFigures: { key: FENKey; index: number }[] = [];

        const myKingIndex = squaresAfterMove.findIndex(
            (key) =>
                key ===
                (color === FigureColor.White
                    ? FENKey.WhiteKing
                    : FENKey.BlackKing)
        );

        // Fulfilling array of enemies.
        squaresAfterMove.forEach((key, index) => {
            if (
                this._utilityService.getColorOfTheFigure(key as FENKey) !==
                    color &&
                key !== FENKey.Empty
            ) {
                enemyFigures.push({ key: key as FENKey, index });
            }
        });

        const isSomeFigureChecksAfterMove = enemyFigures.some(
            ({ key, index }) => {
                const moveToMyKing = this.getMoveByIndexes(index, myKingIndex);

                return this._isFigureCanMoveWrapper(
                    squaresAfterMove,
                    moveToMyKing
                );
            }
        );

        return isSomeFigureChecksAfterMove;
    }

    private _isFigureCanMoveWrapper(squares: string[], move: ChessMove) {
        return (
            this._isTargetSquareValid(squares, move) &&
            this._isFigureCanMove(squares, move)
        );
    }

    private _isFigureCanMove(squares: string[], move: ChessMove): boolean {
        switch (squares[move.fromIndex]) {
            case FENKey.WhiteKing:
            case FENKey.BlackKing:
                return this._isKingCanMove(move);

            case FENKey.WhiteQueen:
            case FENKey.BlackQueen:
                return this._isQueenCanMove(squares, move);

            case FENKey.BlackBishop:
            case FENKey.WhiteBishop:
                return this._isBishopCanMove(squares, move);

            case FENKey.BlackKnight:
            case FENKey.WhiteKnight:
                return this._isKnightCanMove(move);

            case FENKey.WhiteRook:
            case FENKey.BlackRook:
                return this._isRookCanMove(squares, move);

            case FENKey.WhitePawn:
            case FENKey.BlackPawn:
                return this._isPawnCanMove(squares, move);
        }

        return true;
    }

    private _isTargetSquareValid(squares: string[], move: ChessMove) {
        const figure = squares[move.fromIndex] as FENKey;
        const targetSquare = squares[move.toIndex] as FENKey;
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
        return move.absDeltaX <= 1 && move.absDeltaY <= 1;
    }

    private _isKnightCanMove(move: ChessMove) {
        return (
            (move.absDeltaX === 1 && move.absDeltaY === 2) ||
            (move.absDeltaX === 2 && move.absDeltaY === 1)
        );
    }

    private _isBishopCanMove(squares: string[], move: ChessMove) {
        return (
            this._canFigureMoveStraight(squares, move) &&
            move.signY !== 0 &&
            move.signX !== 0
        );
    }

    private _isRookCanMove(squares: string[], move: ChessMove) {
        return (
            this._canFigureMoveStraight(squares, move) &&
            (move.signY === 0 || move.signX === 0)
        );
    }

    private _isQueenCanMove(squares: string[], move: ChessMove) {
        return this._canFigureMoveStraight(squares, move);
    }

    private _isPawnCanMove(squares: string[], move: ChessMove) {
        const isWhiteFigureMoving = this._utilityService.isWhiteFigure(
            squares[move.fromIndex] as FENKey
        );

        const isSignValid = isWhiteFigureMoving
            ? move.deltaY < 0
            : move.deltaY > 0;

        return (
            isSignValid &&
            (this._isPawnAbleToMoveForward(squares, move) ||
                this._isPawnAbleToAttack(squares, move))
        );
    }

    private _canFigureMoveStraight(squares: string[], move: ChessMove) {
        let tempCoordinates = { ...move.from };

        do {
            tempCoordinates = {
                x: tempCoordinates.x + move.signX,
                y: tempCoordinates.y + move.signY
            };
            if (
                tempCoordinates.x === move.to.x &&
                tempCoordinates.y === move.to.y
            ) {
                return true;
            }
        } while (
            this._utilityService.isCoordinatesOnBoard(tempCoordinates) &&
            squares[
                this._utilityService.getIndexByCoordinates(tempCoordinates)
            ] === FENKey.Empty
        );

        return false;
    }

    private _isPawnAbleToMoveForward(squares: string[], move: ChessMove) {
        const isJumpPosition = [1, 6].includes(move.from.y);

        const isJumpPossible =
            isJumpPosition &&
            squares[move.fromIndex + move.signY * 8] === FENKey.Empty &&
            squares[move.toIndex] === FENKey.Empty;

        return (
            move.absDeltaY <= (isJumpPossible ? 2 : 1) &&
            move.deltaX === 0 &&
            squares[move.toIndex] === FENKey.Empty
        );
    }

    private _isPawnAbleToAttack(squares: string[], move: ChessMove) {
        const isWhiteFigureMoving = this._utilityService.isWhiteFigure(
            squares[move.fromIndex] as FENKey
        );
        const isWhiteTargetFigure = this._utilityService.isWhiteFigure(
            squares[move.toIndex] as FENKey
        );

        return (
            move.absDeltaX === 1 &&
            move.absDeltaY === 1 &&
            isWhiteTargetFigure !== isWhiteFigureMoving &&
            squares[move.toIndex] !== FENKey.Empty
        );
    }

    getMoveByIndexes(fromIndex: number, toIndex: number) {
        const fromCoordinates =
            this._utilityService.getCoordinatesByIndex(fromIndex);
        const toCoordinates =
            this._utilityService.getCoordinatesByIndex(toIndex);

        return new ChessMove(
            fromCoordinates,
            toCoordinates,
            fromIndex,
            toIndex
        );
    }

    getSquaresAfterSwap(
        squares: string[],
        fromIndex: number,
        toIndex: number
    ): string[] {
        let newSquares = [...squares];
        [newSquares[fromIndex], newSquares[toIndex]] = [
            '0',
            newSquares[fromIndex]
        ];

        return newSquares;
    }
}
