import { Injectable } from '@angular/core';

import { Coordinates } from '@interfaces/gameboard/coordinates.interface';

@Injectable()
export class UtilityService {
    isBlackSquare(i: number) {
        const { x, y } = this.getChessCoordinatesByIndex(i);

        return (x + y) % 2;
    }

    getChessCoordinatesByIndex(index: number): Coordinates {
        return {
            x: index % 8,
            y: Math.floor(index / 8)
        };
    }
}
