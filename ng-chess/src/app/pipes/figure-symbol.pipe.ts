import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'figureSymbol'
})
export class FigureSymbolPipe implements PipeTransform {
    transform(value: string): string {
        switch (value) {
            case 'K':
                return '&#9812;'; // White King
            case 'Q':
                return '&#9813;'; // White Queen
            case 'R':
                return '&#9814;'; // White Rook
            case 'B':
                return '&#9815;'; // White Bishop
            case 'N':
                return '&#9816;'; // White Knight
            case 'P':
                return '&#9817;'; // White Pawn
            case 'k':
                return '&#9818;'; // Black King
            case 'q':
                return '&#9819;'; // Black Queen
            case 'r':
                return '&#9820;'; // Black Rook
            case 'b':
                return '&#9821;'; // Black Bishop
            case 'n':
                return '&#9822;'; // Black Knight
            case 'p':
                return '&#9823;'; // Black Pawn
            default:
                return '';
        }
    }
}
