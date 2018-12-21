// Angular
import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "ease-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: [ "./navbar.component.scss" ],
})
export class NavbarComponent {
  @Input() showNavbar: boolean;
  @Input() mqAlias: string;

  @Output() openedSidenav = new EventEmitter<boolean>();

  constructor() {
  }

  openSidenav() {
    this.openedSidenav.emit(true);
  }
}
