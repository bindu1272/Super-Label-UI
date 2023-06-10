import { Layout, Button, Avatar, Typography, Dropdown } from "antd";
import { getProfileName } from "../../hocs/helpers";
import "./style.scss";
import { UserOutlined, DownOutlined, MenuOutlined } from "@ant-design/icons";
import { get } from "lodash";
import { logout } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/selectors/authSelectors";
import { useState } from "react";
import Profile from "./profile";
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;
const LayoutHeader = ({ toggleMenuButton }) => {
  const user = useSelector((state) => getUser(state));
  const media = window.matchMedia(`(min-width: 768px)`);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  const [showProfile, setShowProfile] = useState(false);
  const name = get(user, "first_name") + " " + get(user, "last_name");
  const items = [
    {
      label: (
        <div className="user-profile">
          {user?.profilePicture ? (
            <Avatar size={50} src={get(user, "profile_picture")} />
          ) : (
            <Avatar size={50}>{getProfileName(name)}</Avatar>
          )}

          <div className="user-details">
            <Typography.Title level={4} ellipsis={{tooltip:true}} className="username">
              {name}
            </Typography.Title>
            <Typography.Text ellipsis={{tooltip:true}} className="medium-grey" style={{width:"200px"}}>
              {get(user, "email")}
            </Typography.Text>
          </div>
        </div>
      ),
    },
    {
      label: <a className="medium-bold">My Profile</a>,
      icon: <UserOutlined className="medium-icon" />,
      onClick: () => setShowProfile(true)
    },
    {
      label: <a className="medium-bold text-danger">Log Out</a>,
      className: "logout-btn",
      onClick: () => onLogout(),
    },
  ];

  return (
    <Header className="main-header">
      <div className="header-items">
        {!media.matches && (
          <Button
            onClick={toggleMenuButton}
            className="mobile-toggle-button"
          >
            <MenuOutlined />
          </Button>
        )}
        <Typography.Title level={3} className="app-title">
          Super Label
        </Typography.Title>
        <Dropdown
          menu={{ items }}
          overlayClassName="profile-dropdown-style"
          trigger={["click"]}
          arrow={true}
        >
          <a className="profile cursor-pointer">
            {user?.profilePicture ? (
              <Avatar size={45} src={get(user, "profilePicture")} />
            ) : (
              <Avatar size={45}>{getProfileName(name)}</Avatar>
            )}
          </a>
        </Dropdown>
      </div>
      {showProfile && (
        <Profile showProfile={showProfile} setShowProfile={setShowProfile} />
      )}
    </Header>
  );
};
export default LayoutHeader;
