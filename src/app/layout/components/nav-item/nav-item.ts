import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "ease-nav-item",
  template: `
    <a mat-list-item [routerLink]="routerLink" routerLinkActive="active" (click)="navigate.emit()">
      <ng-content></ng-content>
    </a>
  `,
  styleUrls: [ "./nav-item.scss" ],
})
export class NavItemComponent {
  @Input() routerLink: string | any[] = "/";
  @Output() navigate = new EventEmitter();
}
