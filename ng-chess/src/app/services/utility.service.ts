import { Injectable } from '@angular/core';

import { Coordinates } from '@interfaces/gameboard/coordinates.interface';

@Injectable()
export class UtilityService {
    isBlackSquare(i: number) {
        const { x, y } = this.getCoordinatesByIndex(i);

        return (x + y) % 2;
    }

    getCoordinatesByIndex(index: number): Coordinates {
        return {
            x: index % 8,
            y: Math.floor(index / 8)
        };
    }

    getIndexByCoordinates({ x, y }: Coordinates): number {
        return y * 8 + x;
    }

    isCoordinatesOnBoard({ x, y }: Coordinates) {
        return x >= 0 && x <= 7 && y >= 0 && y <= 7;
    }
}
