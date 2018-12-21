// Angular
import { Component, Output, Input, EventEmitter } from "@angular/core";

@Component({
  selector: "ease-side-nav",
  templateUrl: "./side-nav.component.html",
  styleUrls: [ "./side-nav.component.scss" ],
})
export class SideNavComponent {
  @Input() pinned;

  @Input()
  set smallScreen(isSmall) {
    this.showPinButton = !isSmall;
  }

  @Output() closedSidenav = new EventEmitter<boolean>();

  @Output() pinSidenav = new EventEmitter<undefined>();
  @Output() unpinSidenav = new EventEmitter<undefined>();

  showPinButton = false;

  constructor() {
  }

  close() {
    this.closedSidenav.emit(true);
  }

  togglePin() {
    this.pinned ? this.unpinSidenav.emit(undefined) : this.pinSidenav.emit(undefined);
  }
}
