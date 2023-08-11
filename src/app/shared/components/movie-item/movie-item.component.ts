import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MovieModel } from '../../models';
import { USER_SCORE_WIDTH } from '../../constants';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieItemComponent {
  @Input() movie!: MovieModel;
  userScoreWidth = USER_SCORE_WIDTH.forMovieItems;
}
