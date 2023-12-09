import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent {
  @Output() sidenavClose = new EventEmitter();

  constructor(public authService: AuthService) {}

  onSidenavClose() {
    this.sidenavClose.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
