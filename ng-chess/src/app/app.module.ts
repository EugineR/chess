import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameBoardComponent } from '@components/game-board/game-board.component';
import { FigureSymbolPipe } from '@pipes/figure-symbol.pipe';
import { UtilityService } from '@services/utility.service';

@NgModule({
    declarations: [AppComponent, GameBoardComponent, FigureSymbolPipe],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        DragDropModule
    ],
    providers: [UtilityService],
    bootstrap: [AppComponent]
})
export class AppModule {}
