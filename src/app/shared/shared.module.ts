import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components';

const exports = [ComponentsModule];

@NgModule({
  declarations: [],
  imports: [...exports, CommonModule],
  exports: [exports],
})
export class SharedModule {}
