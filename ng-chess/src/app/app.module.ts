import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameBoardComponent } from '@components/game-board/game-board.component';
import { FigureSymbolPipe } from '@pipes/figure-symbol.pipe';
import { UtilityService } from '@services/utility.service';
import { MoveService } from '@services/move-service.service';
import { GameSessionService } from '@services/game-session.service';

@NgModule({
    declarations: [AppComponent, GameBoardComponent, FigureSymbolPipe],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        DragDropModule
    ],
    providers: [UtilityService, MoveService, GameSessionService],
    bootstrap: [AppComponent]
})
export class AppModule {}
