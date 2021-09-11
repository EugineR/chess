import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component
} from '@angular/core';

import { DEFAULT_FEN_POSITIONS } from '../../constants/fen';
import { FigureSymbolPipe } from '../../pipes/figure-symbol.pipe';

@Component({
    selector: 'app-game-board',
    templateUrl: './game-board.component.html',
    styleUrls: ['./game-board.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameBoardComponent {
    fen = DEFAULT_FEN_POSITIONS.split('');

    constructor(private readonly _changeDetectorRef: ChangeDetectorRef) {}

    private static _isBlackSquare(i: number) {
        return ((i % 8) + Math.floor(i / 8)) % 2;
    }

    getSquareClass(i: number) {
        return {
            [`${GameBoardComponent._isBlackSquare(i) ? 'black' : 'white'}`]:
                true,
            square: true
        };
    }

    getInnerHtml(symbol: string) {
        return new FigureSymbolPipe().transform(symbol);
    }
}
