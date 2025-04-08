import bcrypt from "bcryptjs";

class RouteAuth {
  authHash = "";
  timeOutId: NodeJS.Timeout | undefined;
  constructer() {
    this.authHash = this.refreshHash();
  }

  protected refreshHash(): string {
    return bcrypt.hashSync(Date.now().toString(), bcrypt.genSaltSync(10));
  }

  startHashCron() {
    const intervalTime = 1000 * 60 * 60 * 24;
    this.timeOutId = setInterval(() => {
      this.authHash = this.refreshHash();
    }, intervalTime);
  }

  cancelTimeout() {
    clearInterval(this.timeOutId);
  }
}
const routeAuth = new RouteAuth();
export default routeAuth;
