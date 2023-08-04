import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaxPrimaryPageWidthComponent } from './max-primary-page-width/max-primary-page-width.component';
import {RouterLink} from "@angular/router";




@NgModule({
  declarations: [HeaderComponent, MaxPrimaryPageWidthComponent],
  exports: [HeaderComponent],
  imports: [CommonModule, NgOptimizedImage, RouterLink],
})
export class ComponentsModule {}
