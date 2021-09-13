import { Injectable } from '@angular/core';
import { FENKey } from '@constants/figure.enum';

import { UtilityService } from '@services/utility.service';
import { ChessMove } from '@classes/move.class';

@Injectable()
export class MoveService {
    constructor(private readonly _utilityService: UtilityService) {}

    isMoveValid(fen: string[], fromIndex: number, toIndex: number): boolean {
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

    // TODO: implement figure's rules.
    private _isFigureCanMove(figure: string, move: ChessMove): boolean {
        switch (figure) {
            case FENKey.WhiteKing:
            case FENKey.BlackKing:

            case FENKey.WhiteQueen:
            case FENKey.BlackQueen:

            case FENKey.BlackBishop:
            case FENKey.WhiteBishop:

            case FENKey.BlackKnight:
            case FENKey.WhiteKnight:

            case FENKey.WhiteRook:
            case FENKey.BlackRook:

            case FENKey.WhitePawn:
            case FENKey.BlackPawn:
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
}
