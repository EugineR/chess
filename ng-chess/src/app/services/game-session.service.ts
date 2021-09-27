import { Injectable } from '@angular/core';

@Injectable()
export class GameSessionService {
    private _fenStorage: string[] = [];
    private _isWhiteTurn: boolean = true;

    get IsWhiteTurn() {
        return this._isWhiteTurn;
    }

    saveFen(move: string): void {
        this._fenStorage.push(move);
        this._isWhiteTurn = !this._isWhiteTurn;
    }

    getPreviousFen(): string {
        const newLength = this._fenStorage.length - 1;

        const fen = this._fenStorage[newLength];
        this._fenStorage.length = newLength;
        this._isWhiteTurn = !this._isWhiteTurn;

        return fen;
    }

    isFenStorageEmpty() {
        return !this._fenStorage.length;
    }
}
