import { Coordinates } from '@interfaces/gameboard/coordinates.interface';

export class ChessMove {
    constructor(
        private readonly _from: Coordinates,
        private readonly _to: Coordinates
    ) {}

    get From() {
        return this._from;
    }
    get To() {
        return this._to;
    }

    get DeltaX() {
        return this._to.x - this._from.x;
    }

    get DeltaY() {
        return this._to.y - this._from.y;
    }

    get AbsDeltaX() {
        return Math.abs(this.DeltaX);
    }

    get AbsDeltaY() {
        return Math.abs(this.DeltaY);
    }

    get SignX() {
        return Math.sign(this.DeltaX);
    }

    get SignY() {
        return Math.sign(this.DeltaY);
    }
}