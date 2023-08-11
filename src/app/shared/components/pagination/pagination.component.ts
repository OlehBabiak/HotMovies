import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() page!: number;

  constructor(private apiService: ApiService) {}

  onPageLoad() {
    console.log('click');
    this.apiService
      .getMovies(this.page + 1)
      .subscribe((value) => console.log(value));
  }
}
