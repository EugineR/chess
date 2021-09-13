import { Pipe, PipeTransform } from '@angular/core';

import { FENKey } from '@constants/figure.enum';

@Pipe({
    name: 'figureSymbol'
})
export class FigureSymbolPipe implements PipeTransform {
    transform(value: string): string {
        switch (value) {
            case FENKey.WhiteKing:
                return '&#9812;';
            case FENKey.WhiteQueen:
                return '&#9813;';
            case FENKey.WhiteRook:
                return '&#9814;';
            case FENKey.WhiteBishop:
                return '&#9815;';
            case FENKey.WhiteKnight:
                return '&#9816;';
            case FENKey.WhitePawn:
                return '&#9817;';
            case FENKey.BlackKing:
                return '&#9818;';
            case FENKey.BlackQueen:
                return '&#9819;';
            case FENKey.BlackRook:
                return '&#9820;';
            case FENKey.BlackBishop:
                return '&#9821;';
            case FENKey.BlackKnight:
                return '&#9822;';
            case FENKey.BlackPawn:
                return '&#9823;';
            case FENKey.Empty:
            default:
                return '';
        }
    }
}
