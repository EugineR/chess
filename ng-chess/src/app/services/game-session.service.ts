import { Injectable } from '@angular/core';

@Injectable()
export class GameSessionService {
    private _fenStorage: string[] = [];

    constructor() {}

    saveFen(move: string): void {
        this._fenStorage.push(move);
    }

    getPreviousFen(): string {
        const newLength = this._fenStorage.length - 1;

        const fen = this._fenStorage[newLength];
        this._fenStorage.length = newLength;

        return fen;
    }

    isFenStorageEmpty() {
        return !this._fenStorage.length;
    }
}
