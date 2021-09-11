import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component
} from '@angular/core';

import { DEFAULT_FEN_POSITIONS } from '@constants/fen';
import { FigureSymbolPipe } from '@pipes/figure-symbol.pipe';
import { UtilityService } from '@services/utility.service';

@Component({
    selector: 'app-game-board',
    templateUrl: './game-board.component.html',
    styleUrls: ['./game-board.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameBoardComponent {
    fen = DEFAULT_FEN_POSITIONS.split('');

    constructor(
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _utilityService: UtilityService
    ) {}

    getSquareClass(index: number) {
        return {
            [this._utilityService.isBlackSquare(index) ? 'black' : 'white']:
                true,
            square: true
        };
    }

    getInnerHtml(figureSymbol: string) {
        return new FigureSymbolPipe().transform(figureSymbol);
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer !== event.container) {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );

            const previousId = +event.previousContainer.id;
            const currentId = +event.container.id;

            [this.fen[previousId], this.fen[currentId]] = [
                '0',
                this.fen[previousId]
            ];
        }
    }
}
