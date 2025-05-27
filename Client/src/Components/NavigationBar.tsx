import {
  GlobalOutlined,
  StockOutlined,
  TableOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Link } from "react-router-dom";
type MenuItem = Required<MenuProps>["items"][number];
export const NavigationBar = () => {
  const items: MenuItem[] = [
    {
      label: <Link to="/">Stats Per Country/Year</Link>,
      key: "home",
      icon: <StockOutlined />,
    },
    {
      label: <Link to="/globalScore">Countries Leaderboad</Link>,
      key: "globalScore",
      icon: <TableOutlined />,
    },
    {
      label: <Link to="/scorerStats">Scorers Leaderboad</Link>,
      key: "scorerStats",
      icon: <GlobalOutlined />,
    },
  ];

  return <Menu mode="horizontal" items={items} />;
};
