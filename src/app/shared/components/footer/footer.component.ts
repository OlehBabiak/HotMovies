import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  name!: string;
  scrolling: boolean;

  constructor() {
    this.scrolling = false;
  }

  @HostListener('document:scroll', ['$event'])
  onScrollEvent(event: UIEvent) {
    // Use the UIEvent type
    console.log(event.target);
    console.log('scrolling');

    if (!this.scrolling) {
      this.scrolling = true;
    }
  }
}
