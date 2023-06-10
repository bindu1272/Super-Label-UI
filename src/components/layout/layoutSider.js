import { Layout, Menu, Tooltip } from "antd";
import {
  AppstoreFilled,
  AppstoreOutlined,
  UserOutlined,
  InfoCircleFilled,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { includes } from "lodash";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as TYPES from "../../constants/actionTypes";
import { getSidenavSelectedKeys } from "../../redux/selectors/authSelectors";
import logo from "../../assets/images/sl-logo.png";
import { useState } from "react";
import { roles } from "../../constants/roles";
import './style.scss'

const { Sider } = Layout;
const LayoutSider = ({ mobileOpen, menuButtonClose }) => {
  const selectedKeys = useSelector((state) => getSidenavSelectedKeys(state));
  const user = useSelector((state) => state?.auth?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState("1");

  const items = [
    // {
    //   label: "Home",
    //   icon:
    //     activeKey == "1" ? (
    //       <>
    //         <Tooltip title="Dashboard">
    //           <HomeFilled />
    //         </Tooltip>
    //         {mobileOpen && (
    //           <span style={{ fontSize: 20, fontWeight: 500 }}>Dashboard</span>
    //         )}
    //       </>
    //     ) : (
    //       <>
    //         <Tooltip title="Dashboard">
    //           <HomeOutlined />
    //         </Tooltip>
    //         {mobileOpen && (
    //           <span style={{ fontSize: 20, fontWeight: 500 }}>Dashboard</span>
    //         )}
    //       </>
    //     ),
    //   key: "1",
    //   onClick: () => navigate("/dashboard"),
    // },
    {
      label: "Campaigns",
      icon:
        activeKey == "3" ? (
          <>
            <Tooltip title="Campaigns">
              <AppstoreFilled />
            </Tooltip>
            {mobileOpen && (
              <span style={{ fontSize: 20, fontWeight: 500 }}>Campaigns</span>
            )}
          </>
        ) : (
          <>
            <Tooltip title="Campaigns">
              <AppstoreOutlined />
            </Tooltip>
            {mobileOpen && (
              <span style={{ fontSize: 20, fontWeight: 500 }}>Campaigns</span>
            )}
          </>
        ),
      onClick: () => navigate("/campaigns"),
      key: "3",
    },
    // {
    //   label: "Reports",
    //   icon:
    //     activeKey == "4" ? (
    //       <>
    //         <Tooltip title="Reports">
    //           <PictureFilled />
    //         </Tooltip>
    //         {mobileOpen && (
    //           <span style={{ fontSize: 20, fontWeight: 500 }}>Reports</span>
    //         )}
    //       </>
    //     ) : (
    //       <>
    //         <Tooltip title="Reports">
    //           <PictureOutlined />
    //         </Tooltip>
    //         {mobileOpen && (
    //           <span style={{ fontSize: 20, fontWeight: 500 }}>Reports</span>
    //         )}
    //       </>
    //     ),
    //   key: "4",
    //   onClick: () => navigate("/reports"),
    // },
  ];
  const userItems = [
    // {
    //   label: "Home",
    //   icon:
    //     activeKey == "1" ? (
    //       <>
    //         <Tooltip title="Dashboard">
    //           <HomeFilled />
    //         </Tooltip>
    //         {mobileOpen && (
    //           <span style={{ fontSize: 20, fontWeight: 500 }}>Dashboard</span>
    //         )}
    //       </>
    //     ) : (
    //       <>
    //         <Tooltip title="Dashboard">
    //           <HomeOutlined />
    //         </Tooltip>
    //         {mobileOpen && (
    //           <span style={{ fontSize: 20, fontWeight: 500 }}>Dashboard</span>
    //         )}
    //       </>
    //     ),
    //   key: "1",
    //   onClick: () => navigate("/dashboard"),
    // },
    {
      label: "Campaigns",
      icon:
        activeKey == "3" ? (
          <>
            <Tooltip title="Campaigns">
              <AppstoreFilled />
            </Tooltip>
            {mobileOpen && (
              <span style={{ fontSize: 20, fontWeight: 500 }}>Campaigns</span>
            )}
          </>
        ) : (
          <>
            <Tooltip title="Campaigns">
              <AppstoreOutlined />
            </Tooltip>
            {mobileOpen && (
              <span style={{ fontSize: 20, fontWeight: 500 }}>Campaigns</span>
            )}
          </>
        ),
      onClick: () => navigate("/campaigns"),
      key: "3",
    },
    {
      label: "Users",
      icon:
        activeKey == "2" ? (
          <>
            <Tooltip title="Users">
              <UserOutlined />
            </Tooltip>
            {mobileOpen && (
              <span style={{ fontSize: 20, fontWeight: 500 }}>Users</span>
            )}
          </>
        ) : (
          <>
            <Tooltip title="Users">
              <UserOutlined />
            </Tooltip>
            {mobileOpen && (
              <span style={{ fontSize: 20, fontWeight: 500 }}>Users</span>
            )}
          </>
        ),
      key: "2",
      onClick: () => navigate("/campaign-users"),
    },
    {
      label: "Presets",
      icon:
        activeKey == "4" ? (
          <>
            <Tooltip title="Presets">
              <InfoCircleFilled />
            </Tooltip>
            {mobileOpen && (
              <span style={{ fontSize: 20, fontWeight: 500 }}>Presets</span>
            )}
          </>
        ) : (
          <>
            <Tooltip title="Presets">
              <InfoCircleOutlined />
            </Tooltip>
            {mobileOpen && (
              <span style={{ fontSize: 20, fontWeight: 500 }}>Presets</span>
            )}
          </>
        ),
      key: "4",
      onClick: () => navigate("/preset-management"),
    },
    // {
    //   label: "Reports",
    //   icon:
    //     activeKey == "4" ? (
    //       <>
    //         <Tooltip title="Reports">
    //           <PictureFilled />
    //         </Tooltip>
    //         {mobileOpen && (
    //           <span style={{ fontSize: 20, fontWeight: 500 }}>Reports</span>
    //         )}
    //       </>
    //     ) : (
    //       <>
    //         <Tooltip title="Reports">
    //           <PictureOutlined />
    //         </Tooltip>
    //         {mobileOpen && (
    //           <span style={{ fontSize: 20, fontWeight: 500 }}>Reports</span>
    //         )}
    //       </>
    //     ),
    //   key: "4",
    //   onClick: () => navigate("/reports"),
    // },
  ];

  const memberItems = [
    // {
    //   label: "Home",
    //   icon:
    //     activeKey == "1" ? (
    //       <>
    //         <Tooltip title="Dashboard">
    //           <HomeFilled />
    //         </Tooltip>
    //         {mobileOpen && (
    //           <span style={{ fontSize: 20, fontWeight: 500 }}>Dashboard</span>
    //         )}
    //       </>
    //     ) : (
    //       <>
    //         <Tooltip title="Dashboard">
    //           <HomeOutlined />
    //         </Tooltip>
    //         {mobileOpen && (
    //           <span style={{ fontSize: 20, fontWeight: 500 }}>Dashboard</span>
    //         )}
    //       </>
    //     ),
    //   key: "1",
    //   onClick: () => navigate("/dashboard"),
    // },
    {
      label: "Campaigns",
      icon:
        activeKey == "3" ? (
          <>
            <Tooltip title="Campaigns">
              <AppstoreFilled />
            </Tooltip>
            {mobileOpen && (
              <span style={{ fontSize: 20, fontWeight: 500 }}>Campaigns</span>
            )}
          </>
        ) : (
          <>
            <Tooltip title="Campaigns">
              <AppstoreOutlined />
            </Tooltip>
            {mobileOpen && (
              <span style={{ fontSize: 20, fontWeight: 500 }}>Campaigns</span>
            )}
          </>
        ),
      onClick: () => navigate("/campaigns"),
      key: "3",
    },
    {
      label: "Presets",
      icon:
        activeKey == "4" ? (
          <>
            <Tooltip title="Presets">
              <InfoCircleFilled />
            </Tooltip>
            {mobileOpen && (
              <span style={{ fontSize: 20, fontWeight: 500 }}>Presets</span>
            )}
          </>
        ) : (
          <>
            <Tooltip title="Presets">
              <InfoCircleOutlined />
            </Tooltip>
            {mobileOpen && (
              <span style={{ fontSize: 20, fontWeight: 500 }}>Presets</span>
            )}
          </>
        ),
      key: "4",
      onClick: () => navigate("/preset-management"),
    },
    // {
    //   label: "Reports",
    //   icon:
    //     activeKey == "4" ? (
    //       <>
    //         <Tooltip title="Reports">
    //           <PictureFilled />
    //         </Tooltip>
    //         {mobileOpen && (
    //           <span style={{ fontSize: 20, fontWeight: 500 }}>Reports</span>
    //         )}
    //       </>
    //     ) : (
    //       <>
    //         <Tooltip title="Reports">
    //           <PictureOutlined />
    //         </Tooltip>
    //         {mobileOpen && (
    //           <span style={{ fontSize: 20, fontWeight: 500 }}>Reports</span>
    //         )}
    //       </>
    //     ),
    //   key: "4",
    //   onClick: () => navigate("/reports"),
    // },
    
  ]
  const onChangeSelectedKey = (e) => {
    menuButtonClose();
    setActiveKey(e.key);
  };
  return (
    <>
     <div className="logo">
        <img src={logo} alt="logo" width={40} />
      </div>
    <Sider
      width={80}
      theme="light"
      className={`sidenav ${mobileOpen && "menu-close"}`}
    >
      <Menu
        items={user?.["roles"] === roles?.ADMIN?.value ? userItems : (user?.["roles"] === roles?.MEMBER?.value? memberItems : items)}
        className="sidemenu"
        selectedKeys={selectedKeys}
        onClick={(e) => {
          onChangeSelectedKey(e);
        }}
      />
    </Sider>
    </>
  );
};
export default LayoutSider;
