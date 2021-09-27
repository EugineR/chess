import { Coordinates } from '@interfaces/gameboard/coordinates.interface';

export class ChessMove {
    constructor(
        private readonly _from: Coordinates,
        private readonly _to: Coordinates,
        private readonly _fromIndex: number,
        private readonly _toIndex: number
    ) {}

    get from() {
        return this._from;
    }

    get to() {
        return this._to;
    }

    get fromIndex() {
        return this._fromIndex;
    }

    get toIndex() {
        return this._toIndex;
    }

    get deltaX() {
        return this._to.x - this._from.x;
    }

    get deltaY() {
        return this._to.y - this._from.y;
    }

    get absDeltaX() {
        return Math.abs(this.deltaX);
    }

    get absDeltaY() {
        return Math.abs(this.deltaY);
    }

    get signX() {
        return Math.sign(this.deltaX);
    }

    get signY() {
        return Math.sign(this.deltaY);
    }
}
