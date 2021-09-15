import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component
} from '@angular/core';

import { DEFAULT_FEN_POSITIONS } from '@constants/fen';
import { FigureSymbolPipe } from '@pipes/figure-symbol.pipe';
import { UtilityService } from '@services/utility.service';
import { MoveService } from '@services/move-service.service';

@Component({
    selector: 'app-game-board',
    templateUrl: './game-board.component.html',
    styleUrls: ['./game-board.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameBoardComponent {
    fen = DEFAULT_FEN_POSITIONS.split('');

    private _selectedFigureIndex: number;

    constructor(
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _utilityService: UtilityService,
        private readonly _moveService: MoveService
    ) {}

    getSquareClass(index: number) {
        return {
            [this._utilityService.isBlackSquare(index) ? 'black' : 'white']:
                true,
            square: true,
            'possible-move':
                !!this._selectedFigureIndex &&
                this._moveService.isMoveValid(
                    this.fen,
                    this._selectedFigureIndex,
                    index
                )
        };
    }
    // Uncomment it for debugging purposes
    // getCoords(index: number) {
    //     const { x, y } = this._utilityService.getCoordinatesByIndex(index);
    //     return `x:${x}:y:${y}`;
    // }

    getInnerHtml(figureSymbol: string) {
        return new FigureSymbolPipe().transform(figureSymbol);
    }

    drop(event: CdkDragDrop<string[]>) {
        const fromIndex = +event.previousContainer.id;
        const toIndex = +event.container.id;

        if (
            event.previousContainer !== event.container &&
            this._moveService.isMoveValid(this.fen, fromIndex, toIndex)
        ) {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );

            this._doMove(fromIndex, toIndex);
        }
    }

    selectFigure(event: MouseEvent, figure: string, index: number): void {
        const isPossibleMove = (event.target as Element).className.includes(
            'possible-move'
        );

        if (isPossibleMove) {
            this._doMove(this._selectedFigureIndex, index);
            return;
        }

        this._selectedFigureIndex = figure !== '0' ? index : undefined!;
    }

    private _doMove(fromIndex: number, toIndex: number) {
        [this.fen[fromIndex], this.fen[toIndex]] = ['0', this.fen[fromIndex]];
        this._selectedFigureIndex = undefined!;
    }
}
