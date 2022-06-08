import { observable, computed, action, makeObservable } from "mobx";

class GlobalStore {
  constructor(value) {
    makeObservable(this, {
      loginStatus: observable,
      userData: observable,
      isMenuCollapsed: observable,
      isUserLogged: observable,
      isDev: observable,
      collapseMenu: action,
      setLoggedInUser: action,
    });
  }

  isDev = true;

  isMenuCollapsed = true;

  loginStatus = "loading";

  isUserLogged = false;

  userData = null;

  /**
   *
   * This is will set logged in user status and user data
   * @param {String} status - Login status of the user e.g: loading, authenticated
   * @param {Object} data - user data such as email,name,image
   * @memberof GlobalStore
   */
  setLoggedInUser = (status, data) => {
    this.loginStatus = status;
    this.userData = data;
    this.isUserLogged = status === "authenticated";
  };

  collapseMenu = () => {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  };
}

export default new GlobalStore();
