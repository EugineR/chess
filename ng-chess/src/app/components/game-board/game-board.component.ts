import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component
} from '@angular/core';

@Component({
    selector: 'app-game-board',
    templateUrl: './game-board.component.html',
    styleUrls: ['./game-board.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameBoardComponent {
    squares = new Array(64).fill(1);

    constructor(private readonly _changeDetectorRef: ChangeDetectorRef) {}

    private static _isBlackSquare(i: number) {
        return ((i % 8) + Math.floor(i / 8)) % 2;
    }

    getSquareClass(i: number) {
        return {
            [`${
                GameBoardComponent._isBlackSquare(i) ? 'black' : 'white'
            }-square`]: true
        };
    }
}
