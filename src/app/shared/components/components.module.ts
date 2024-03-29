import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaxPrimaryPageWidthComponent } from './max-primary-page-width/max-primary-page-width.component';
import {RouterLink, RouterLinkActive} from "@angular/router";
import { UserScoreComponent } from './user-score/user-score.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FooterComponent } from './footer/footer.component';




@NgModule({
  declarations: [
    HeaderComponent,
    MaxPrimaryPageWidthComponent,
    UserScoreComponent,
    PaginationComponent,
    FooterComponent,
  ],
  exports: [
    HeaderComponent,
    UserScoreComponent,
    PaginationComponent,
    FooterComponent,
  ],
  imports: [CommonModule, NgOptimizedImage, RouterLink, RouterLinkActive],
})
export class ComponentsModule {}
