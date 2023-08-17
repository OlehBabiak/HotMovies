import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
} from '@angular/core';
import { MovieModel } from '../../models';
import {
  BASE_IMG_URL,
  USER_SCORE_WIDTH_CONFIG_TOKEN,
  UserScoreConfig,
} from '../../constants';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
  providers: [
    {
      provide: USER_SCORE_WIDTH_CONFIG_TOKEN,
      useValue: { width: 36 },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieItemComponent {
  @Input() movie!: MovieModel;
  userScoreWidth = this.userScoreConfig.width;

  constructor(
    @Inject(USER_SCORE_WIDTH_CONFIG_TOKEN)
    private userScoreConfig: UserScoreConfig
  ) {}

  getFullImageUrl(imageUrl: string): string {
    return BASE_IMG_URL + imageUrl;
  }
}
