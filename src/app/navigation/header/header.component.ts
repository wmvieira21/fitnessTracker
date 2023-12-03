import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output('onSidenavToggle') sidenavToggle = new EventEmitter();

  onToggle() {
    this.sidenavToggle.emit();
  }
}
