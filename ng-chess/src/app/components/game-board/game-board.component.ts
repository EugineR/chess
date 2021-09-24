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
import { GameSessionService } from '@services/game-session.service';
import { FENKey } from '@constants/figure.enum';

@Component({
    selector: 'app-game-board',
    templateUrl: './game-board.component.html',
    styleUrls: ['./game-board.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameBoardComponent {
    get squares(): string[] {
        return this._fen.split('');
    }

    get isRevertDisabled(): boolean {
        return this._gameSessionService.isFenStorageEmpty();
    }

    get getBoardClass() {
        return {
            flipped: this._isFlipBoard
        };
    }

    private _fen: string = DEFAULT_FEN_POSITIONS;
    private _selectedFigureIndex: number;
    private _isFlipBoard = false;

    constructor(
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _utilityService: UtilityService,
        private readonly _moveService: MoveService,
        private readonly _gameSessionService: GameSessionService
    ) {}

    flipBoard() {
        this._isFlipBoard = !this._isFlipBoard;
    }

    getSquareClass(index: number) {
        return {
            [this._utilityService.isBlackSquare(index) ? 'black' : 'white']:
                true,
            square: true,
            flipped: this._isFlipBoard,
            'possible-move': this._isPossibleMove(index),
            'possible-attack':
                this._isPossibleMove(index) &&
                this._fen[index] !== FENKey.Empty,
            'selected-figure': this._selectedFigureIndex === index
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
            this._moveService.isMoveValid(this.squares, fromIndex, toIndex)
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

    doRevertMove() {
        this._fen = this._gameSessionService.getPreviousFen();
        this._changeDetectorRef.detectChanges();
    }

    private _doMove(fromIndex: number, toIndex: number) {
        this._gameSessionService.saveFen(this._fen);
        this._swapFigures(fromIndex, toIndex);
        this._selectedFigureIndex = undefined!;
    }

    private _swapFigures(fromIndex: number, toIndex: number): void {
        this._fen = this._moveService
            .getSquaresAfterSwap(this.squares, fromIndex, toIndex)
            .join('');
    }

    private _isPossibleMove(index: number) {
        return (
            !!this._selectedFigureIndex &&
            this._moveService.isMoveValid(
                this.squares,
                this._selectedFigureIndex,
                index
            )
        );
    }
}
