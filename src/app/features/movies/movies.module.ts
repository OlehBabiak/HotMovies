import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './movies.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MovieItemComponent } from './movie-item/movie-item.component';

@NgModule({
  declarations: [MoviesComponent, MovieItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: MoviesComponent }]),
  ],
})
export class MoviesModule {}
