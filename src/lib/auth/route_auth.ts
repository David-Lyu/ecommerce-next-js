class RouteAuth {
  authHash = "";
  constructer() {}

  protected refreshHash(): boolean {
    return false;
  }
}
const routeAuth = new RouteAuth();
export default routeAuth;
