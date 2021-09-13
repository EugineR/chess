import { Injectable } from '@angular/core';

import { Coordinates } from '@interfaces/gameboard/coordinates.interface';

@Injectable()
export class UtilityService {
    isBlackSquare(i: number) {
        const { x, y } = this.getFigureCoordinatesByIndex(i);

        return (x + y) % 2;
    }

    getFigureCoordinatesByIndex(index: number): Coordinates {
        return {
            x: index % 8,
            y: Math.floor(index / 8)
        };
    }
}
