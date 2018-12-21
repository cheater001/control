// Angular
import { Component, OnInit, Optional, SkipSelf, ViewChild } from "@angular/core";

// Material
import { CdkAccordionItem } from "@angular/cdk/accordion";

// Components
import { NavGroupItemComponent } from "../nav-group-item/nav-group-item.component";

@Component({
  selector: "ease-nav-group-title",
  templateUrl: "./nav-group-title.component.html",
  styleUrls: [ "./nav-group-title.component.scss" ],
})
export class NavGroupTitleComponent implements OnInit {
  @ViewChild(CdkAccordionItem) panel: CdkAccordionItem;

  constructor(@Optional() @SkipSelf() public navGroupItem: NavGroupItemComponent) {
  }

  ngOnInit() {
    // TODO this is not good
    this.panel.expandedChange.subscribe(value => {
      this.navGroupItem.expand$.next(value);
    });
  }
}
