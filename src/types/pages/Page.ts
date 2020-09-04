export interface IPage {
  history: {
    createHref: any;
    action: string;
    location: { pathname: string; search: string; hash: string; state: any };
    push: any;
    replace: any;
    go: any;
    goBack: any;
    goForward: any;
    listen: any;
    block: any;
  };
  location: { pathname: string; search: string; hash: string; state: any };
  match: { path: string; url: string; isExact: Boolean; params: any };
  staticContext: any;
  route: {
    component: any;
    title: string;
    path: string;
    exact: Boolean;
  };
}
