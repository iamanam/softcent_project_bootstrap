import {
  faBars,
  faBell,
  faCog,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Icon from "../util/Icon";
import GlobalStore from "../stores/GlobalStore";
import { observer } from "mobx-react";
import { getRootCssVariable, setRootCssVariable } from "../util/styleUtil";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";
import { signIn, signOut } from "next-auth/react";

export default observer(function Header({ breadCrumb }) {
  /**
   *
   * This will change a root css variable value depending on sidebar collapse status
   * @param {*} isMenuCollapsed
   */

  function changeCssVariableValueOfSidebar(isMenuCollapsed) {
    setRootCssVariable(
      "--sidebarWidth",
      isMenuCollapsed
        ? getRootCssVariable("--sidebarCollapsedWidth")
        : getRootCssVariable("--sidebarFullWidth")
    );
  }

  //const { data: session, status } = useSession();

  const { isUserLogged, userData, loginStatus } = GlobalStore;

  return (
    <>
      <div className="flex w-full justify-between items-center h-full">
        <div className="logo-panel flex">
          <div className="justify-start flex pl-3">
            <button
              id="menu-bar"
              type="button"
              onClick={() => {
                GlobalStore.collapseMenu();
                changeCssVariableValueOfSidebar(GlobalStore.isMenuCollapsed);
              }}
            >
              <Icon name={faBars}></Icon>
            </button>
            <div className="flex w-full pl-5">
              <Breadcrumb>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Admin Panel</BreadcrumbLink>
                </BreadcrumbItem>
                {breadCrumb?.length > 0 &&
                  breadCrumb.map((item) => {
                    return (
                      <BreadcrumbItem key={item.url} className="capitalize">
                        <BreadcrumbLink
                          isCurrentPage={item.url === "#"}
                          href={item.url}
                        >
                          {item.title}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    );
                  })}
              </Breadcrumb>
            </div>
          </div>
        </div>
        <div className="flex"></div>
        <div className="flex justify-end user-data">
          <div className="notification">
            <div className="notification-btn">
              <span className="notification-number">{8}</span>
              <Button variant="transparent">
                <Icon name={faBell}></Icon>
              </Button>
            </div>
            <div className="option-menu">
              <ul>
                <li>Menu item 1</li>
                <li>Menu item 1</li>
                <li>Menu item 1</li>
                <li>Menu item 1</li>
              </ul>
            </div>
          </div>

          <div className="notification">
            <div className="notification-btn">
              <Button variant="transparent">
                <Icon name={faUser}></Icon>
              </Button>
            </div>
            <div className="option-menu">
              <ul>
                {isUserLogged && (
                  <li>
                    <p className="text-xs italic">
                      Logged in as {userData?.email}
                    </p>
                  </li>
                )}

                <li>
                  <Link href="/settings/site">
                    <a>
                      <Icon name={faCog}></Icon>
                      <span className="ml-2">Settings</span>
                    </a>
                  </Link>
                </li>
                {loginStatus !== "loading" && (
                  <li>
                    <a
                      role="button"
                      onClick={() => {
                        if (userData?.email) {
                          signOut();
                        } else {
                          signIn();
                        }
                      }}
                    >
                      <Icon name={faSignOutAlt}></Icon>
                      <span className="ml-2">
                        {userData?.email ? "Log out" : "Log in"}
                      </span>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
