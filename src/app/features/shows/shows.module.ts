import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowsComponent } from './shows.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MoviesComponent } from '../movies/movies.component';

@NgModule({
  declarations: [ShowsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: ShowsComponent }]),
  ],
})
export class ShowsModule {}
