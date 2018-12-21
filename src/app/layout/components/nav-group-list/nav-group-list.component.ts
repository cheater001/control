// Angular
import { Component, Optional, SkipSelf } from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";

// Components
import { NavGroupItemComponent } from "../nav-group-item/nav-group-item.component";

@Component({
  selector: "ease-nav-group-list",
  templateUrl: "./nav-group-list.component.html",
  styleUrls: [ "./nav-group-list.component.scss" ],
  animations: [
    trigger("bodyExpansion", [
      state("collapsed", style({ height: "0px", display: "none" })),
      state("expanded", style({ height: "*", display: "block" })),
      transition("expanded <=> collapsed", animate("225ms cubic-bezier(0.4,0.0,0.2,1)")),
    ]),
  ],
})
export class NavGroupListComponent {

  constructor(@Optional() @SkipSelf() public navGroupItem: NavGroupItemComponent) {
  }
}
