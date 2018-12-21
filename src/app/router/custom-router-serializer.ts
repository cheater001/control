import { RouterStateSnapshot, ActivatedRouteSnapshot, Params } from "@angular/router";

import { RouterStateSerializer } from "@ngrx/router-store";

export interface RouterStateUrl {
  url: string;
  root: ActivatedRouteSnapshot;
  params: Params;
}

export class CustomRouterStateSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const params = routerState.root.children.map(c => c.params).reduce(
      (acc, p) => ({
        ...acc,
        ...p,
      }),
      {},
    );

    return {
      root: this.serializeRoute(routerState.root),
      url: routerState.url,
      params,
    };
  }

  private serializeRoute(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    const children = route.children.map(c => this.serializeRoute(c));

    return {
      params: route.params,
      paramMap: route.paramMap,
      data: route.data,
      url: route.url,
      outlet: route.outlet,
      routeConfig: {
        component: route.routeConfig ? route.routeConfig.component : undefined,
      },
      queryParams: route.queryParams,
      queryParamMap: route.queryParamMap,
      fragment: route.fragment,
      component: (route.routeConfig ? route.routeConfig.component : undefined) as any,
      root: undefined as any,
      parent: undefined as any,
      firstChild: children[ 0 ],
      pathFromRoot: undefined as any,
      children,
    };
  }
}
