import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import {
  USER_SCORE_COEFFICIENT,
  USER_SCORE_LEVEL_COLORS,
  USER_SCORE_PERCENTAGE_LEVELS,
} from '../../constants';

@Component({
  selector: 'app-user-score',
  templateUrl: './user-score.component.html',
  styleUrls: ['./user-score.component.scss'],
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
  userScoreCoefficient = USER_SCORE_COEFFICIENT;

  constructor() {}

  ngAfterViewInit(): void {
    console.log(this.width, this.percent);
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
      case this.percent > USER_SCORE_PERCENTAGE_LEVELS.none &&
        this.percent <= USER_SCORE_PERCENTAGE_LEVELS.extraSmall:
        color = USER_SCORE_LEVEL_COLORS.extraSmall;
        break;
      case this.percent > USER_SCORE_PERCENTAGE_LEVELS.extraSmall &&
        this.percent <= USER_SCORE_PERCENTAGE_LEVELS.small:
        color = USER_SCORE_LEVEL_COLORS.small;
        break;
      case this.percent > USER_SCORE_PERCENTAGE_LEVELS.small &&
        this.percent <= USER_SCORE_PERCENTAGE_LEVELS.medium:
        color = USER_SCORE_LEVEL_COLORS.medium;
        break;
      case this.percent > USER_SCORE_PERCENTAGE_LEVELS.medium &&
        this.percent <= USER_SCORE_PERCENTAGE_LEVELS.large:
        color = USER_SCORE_LEVEL_COLORS.large;
        break;
      case this.percent > USER_SCORE_PERCENTAGE_LEVELS.large:
        color = USER_SCORE_LEVEL_COLORS.extraLarge;
        break;
      default:
        color = USER_SCORE_LEVEL_COLORS.extraSmall;
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
