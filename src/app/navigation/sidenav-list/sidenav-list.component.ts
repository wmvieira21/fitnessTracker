import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent {
  @Output() sidenavClose = new EventEmitter();

  onSidenavClose() {
    this.sidenavClose.emit();
  }

  onLogout() {
    console.log('loging out');
  }
}
