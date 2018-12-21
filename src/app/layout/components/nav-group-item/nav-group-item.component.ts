// RxJS
import { BehaviorSubject } from "rxjs";
import { filter, takeWhile } from "rxjs/operators";

// Angular
import { Component, ContentChildren, AfterContentInit, OnDestroy, QueryList } from "@angular/core";
import { NavigationEnd, Router, RouterEvent, RouterLink } from "@angular/router";

@Component({
  selector: "ease-nav-group-item",
  templateUrl: "./nav-group-item.component.html",
  styleUrls: [ "./nav-group-item.component.scss" ],
  host: {
    "[class.has-active-links]": "isActive",
  },
})
export class NavGroupItemComponent implements OnDestroy, AfterContentInit {
  @ContentChildren(RouterLink, { descendants: true }) links: QueryList<RouterLink>;

  readonly expand$ = new BehaviorSubject<boolean>(false);

  isActive: boolean;

  private alive = true;

  constructor(
    private router: Router,
  ) {

    this.router.events.pipe(
      takeWhile(_ => this.alive),
      filter((s: RouterEvent) => s instanceof NavigationEnd),
    ).subscribe(_ => this.update());
  }

  ngAfterContentInit(): void {
    this.links.changes.pipe(
      takeWhile(_ => this.alive),
    ).subscribe(_ => this.update());

    this.update();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private update(): void {
    if (!this.links || !this.router.navigated) return;

    Promise.resolve().then(() => {
      this.isActive = this.hasActiveLinks();
    });
  }

  private isLinkActive(router: Router): (link: (RouterLink)) => boolean {
    return (link: RouterLink) => router.isActive(link.urlTree, false);
  }

  private hasActiveLinks(): boolean {
    return this.links.some(this.isLinkActive(this.router));
  }
}
