import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaxPrimaryPageWidthComponent } from './max-primary-page-width/max-primary-page-width.component';
import {RouterLink, RouterLinkActive} from "@angular/router";
import { UserScoreComponent } from './user-score/user-score.component';




@NgModule({
  declarations: [
    HeaderComponent,
    MaxPrimaryPageWidthComponent,
    UserScoreComponent,
  ],
  exports: [HeaderComponent, UserScoreComponent],
  imports: [CommonModule, NgOptimizedImage, RouterLink, RouterLinkActive],
})
export class ComponentsModule {}
