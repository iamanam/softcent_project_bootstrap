import {
  faHeadphones,
  faHome,
  faAngleRight,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react";
import Link from "next/link";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Icon from "../util/Icon";

function SingleMenuItem({ title, href, iconName, replaceLink }) {
  return (
    <>
      <MenuItem icon={<Icon name={iconName || faAngleRight} />}>
        <Link href={href} passHref replace={replaceLink}>
          <a>{title}</a>
        </Link>
      </MenuItem>
    </>
  );
}

export default observer(function SideBar({ collapsed }) {
  return (
    <ProSidebar collapsed={collapsed}>
      <Menu iconShape="square">
        <SingleMenuItem title="Dashboard" href="/" iconName={faHome} />

        <SubMenu title="Partner" icon={<Icon name={faUserAlt} />}>
          <SingleMenuItem title="Partner Manage" href="/partner/manage" />
        </SubMenu>
      </Menu>
    </ProSidebar>
  );
});
