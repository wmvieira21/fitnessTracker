import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output('onSidenavToggle') sidenavToggle = new EventEmitter();

  constructor(public authService: AuthService) {}

  onToggle() {
    this.sidenavToggle.emit();
  }
}
