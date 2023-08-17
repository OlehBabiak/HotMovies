import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  ViewChild,
} from '@angular/core';
import {
  defaultUserScoreConfig,
  USER_SCORE_WIDTH_CONFIG_TOKEN,
  UserScoreConfig,
} from '../../constants';

@Component({
  selector: 'app-user-score',
  templateUrl: './user-score.component.html',
  styleUrls: ['./user-score.component.scss'],
  providers: [
    {
      provide: USER_SCORE_WIDTH_CONFIG_TOKEN,
      useValue: defaultUserScoreConfig
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserScoreComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D | null = null;
  @Input() width!: number; // Радіус круга;
  @Input() percent!: number;
  startAngle!: number;
  endAngle!: number;
  radius!: number;
  userScoreCoefficient = this.userScoreConfig.coefficient;

  constructor(
    @Inject(USER_SCORE_WIDTH_CONFIG_TOKEN)
    private userScoreConfig: UserScoreConfig
  ) {}

  ngAfterViewInit(): void {
    console.log(this.userScoreConfig)
    this.ctx = this.canvasRef.nativeElement.getContext('2d');

    if (this.ctx) {
      this.drawClock();
    } else {
      console.error('Canvas context is not available.');
    }
  }

  drawClock(): void {
    if (!this.ctx) return;
    this.radius = this.width / 2;
    this.startAngle = -Math.PI / 2; // Початковий кут (12 годинникова позиція)
    this.endAngle = -Math.PI / 2 + (Math.PI * this.percent) / 50; // Кут до години великої стрілки на годиннику

    let color: string;
    switch (true) {
      case this.percent > this.userScoreConfig.percentageLevels.none &&
        this.percent <= this.userScoreConfig.percentageLevels.extraSmall:
        color = this.userScoreConfig.levelColors.extraSmall;
        break;
      case this.percent > this.userScoreConfig.percentageLevels.extraSmall &&
        this.percent <= this.userScoreConfig.percentageLevels.small:
        color = this.userScoreConfig.levelColors.small;
        break;
      case this.percent > this.userScoreConfig.percentageLevels.small &&
        this.percent <= this.userScoreConfig.percentageLevels.medium:
        color = this.userScoreConfig.levelColors.medium;
        break;
      case this.percent > this.userScoreConfig.percentageLevels.medium &&
        this.percent <= this.userScoreConfig.percentageLevels.large:
        color = this.userScoreConfig.levelColors.large;
        break;
      case this.percent > this.userScoreConfig.percentageLevels.large:
        color = this.userScoreConfig.levelColors.extraLarge;
        break;
      default:
        color = this.userScoreConfig.levelColors.extraSmall;
    }

    // Очистити холст
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    // Вирахувати координати центра круга
    const centerX = this.ctx.canvas.width / 2;
    const centerY = this.ctx.canvas.height / 2;

    // Намалювати круг
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = '#1e6649';
    this.ctx.fill();

    // Намалювати заповнений сектор
    this.ctx.beginPath();
    this.ctx.moveTo(centerX, centerY);
    this.ctx.arc(centerX, centerY, this.radius, this.startAngle, this.endAngle);
    this.ctx.closePath();
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }

  calculateRoundedPercent(): number {
    return Math.round(this.percent);
  }
}
