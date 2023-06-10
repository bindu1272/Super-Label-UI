import {
  Button,
  Space,
  Table,
  Input,
  Row,
  Col,
  notification,
  message,
  Typography,
  Card,
  Tooltip,
  Modal,
} from "antd";
import { useEffect, useState } from "react";
import CreateCampaignUserScreen from "../../screens/campaignUsersManagement/createCampaignUserScreen";
import { useSelector } from "react-redux";
import "./style.scss";
import { deleteCampaignUserById } from "../../redux/actions/campaignUserActions";
import get from "lodash/get";
import map from "lodash/map";
import { getCampaignUsers } from "../../redux/actions/authActions";
import ResetPassword from "../../screens/resetPassword/resetPassword";
import { roles } from "../../constants/roles";
import {
  PlusOutlined,
  EditOutlined,
  DeleteFilled,
  UnlockFilled,
  ExclamationCircleFilled,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Meta } = Card;
const CampaignTable = () => {
  const [showEditCampaignUser, setShowEditCampaignUser] = useState(null);
  const [openReset, setOpenReset] = useState(false);
  const [open, setOpen] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [startKey, setStartKey] = useState(1);
  const [prevKey, setPrevKey] = useState(0);
  const [total, setTotal] = useState();
  const [hasNext, setHasNext] = useState(true);
  const [users, setUsers] = useState();
  const user = useSelector((state) => get(state, "auth.user"));
  const size = 20;
  const media = window.matchMedia(`(min-width: 768px)`);

  const fetchUsers = () => {
    setLoading(true);
    let params = {
      page: currentPage,
      startKey: startKey,
      prevKey: prevKey === 0 ? null : prevKey,
    };
    if (searchValue) {
      params["name"] = searchValue;
    }
    getCampaignUsers(params)
      .then((result) => {
        setUsers(result?.data);
        setCurrentPage(result?.meta?.pagination?.current_page);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const createUser = () => {
    setOpen(true);
  };
  useEffect(() => {
    setLoading(true);
    let params = {
      page: currentPage,
      startKey: startKey,
      prevKey: prevKey === 0 ? null : prevKey,
    };
    if (searchValue) {
      params["first_name"] = searchValue;
    }
    getCampaignUsers(params)
      .then((result) => {
        setHasNext(result?.data?.length >= size);
        setUsers(result?.data);
        // setCurrentPage(result?.meta?.pagination?.current_page);
        setTotal(result?.meta?.pagination?.total);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [currentPage]);

  const clickResetPassword = (props) => {
    setShowResetPassword(props?.id);
    setOpenReset(true);
  };
  const showConfirm = (id) => {
    Modal.confirm({
      title: (
        <>
          Do you want to delete this campaign user? <br /> This can’t be undone
        </>
      ),
      icon: <ExclamationCircleFilled />,
      onOk() {
        deleteCampaignUser(id);
      },
      okText: "Delete",
      okType: "danger",
      okButtonProps: { icon: <DeleteOutlined /> },
    });
  };
  const deleteCampaignUser = (id) => {
    deleteCampaignUserById(id)
      .then((res) => {
        notification.success({
          message: "Deleted User Successfully",
        });
        fetchUsers();
      })
      .catch(() => {});
  };
  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      render: (props) => {
        return (
          <Space>
            {user["roles"] === 1 && (
              <>
                <Button
                  type="primary"
                  onClick={() => setShowEditCampaignUser(props?.id)}
                >
                  Edit
                </Button>
                <Button onClick={() => clickResetPassword(props)}>
                  Reset Password
                </Button>
                <Button onClick={() => showConfirm(props?.id)} danger>
                  Delete
                </Button>
              </>
            )}
          </Space>
        );
      },
    },
  ];
  const onPrev = () => {
    setCurrentPage(currentPage - 1);
  };
  const onNext = () => {
    setCurrentPage(currentPage + 1);
  };
  const onSearch = () => {
    const params = {
      page: currentPage,
      startKey: startKey,
    };
    if (searchValue) {
      params["name"] = searchValue;
    }
    setLoading(true);
    getCampaignUsers(params).then((result) => {
      setLoading(false);
      setUsers(result?.data);
      setCurrentPage(1);
      setTotal(result?.meta?.pagination?.total);
    });
  };
  return (
    <>
      <div className="header">
        <Typography.Title level={4} className="page-title">
          Users
        </Typography.Title>
        <Input
          placeholder="Search"
          onChange={(e) => setSearchValue(e.target.value)}
          onPressEnter={() => onSearch()}
          className="search-bar"
          prefix={<SearchOutlined style={{ color: "grey" }} />}
        />
        {user?.["roles"] === roles?.ADMIN?.value && (
          <div className="right-section">
            <Button type="primary" icon={<PlusOutlined />} onClick={createUser}>
              Create User
            </Button>
          </div>
        )}
      </div>
      <Input
        placeholder="Search name"
        onChange={(e) => setSearchValue(e.target.value)}
        onPressEnter={() => onSearch()}
        className="mobile-search-bar"
        prefix={<SearchOutlined style={{ color: "grey" }} />}
      />
      {media.matches ? (
        <Table
          columns={columns}
          dataSource={users}
          pagination={false}
          loading={loading}
          className="assetType-table"
          footer={() => {
            if (total > size) {
              return (
                <Space className="assetType-pagination">
                  <Button
                    onClick={() => onPrev()}
                    disabled={currentPage == 1 ? true : false}
                  >
                    Prev
                  </Button>
                  <Button type="primary">{currentPage}</Button>
                  <Button
                    onClick={() => onNext()}
                    disabled={!hasNext || currentPage * size >= total}
                  >
                    Next
                  </Button>
                </Space>
              );
            }
          }}
        />
      ) : (
        <>
          <div className="assetType-card">
            {users &&
              map(users, (user) => (
                <Card
                  style={{
                    width: "100%",
                    margin: "16px auto",
                  }}
                  actions={[
                    <Tooltip title={<span>Edit</span>}>
                      <EditOutlined
                        onClick={() => setShowEditCampaignUser(user.id)}
                      />
                    </Tooltip>,
                    <Tooltip title={<span>Reset Password</span>}>
                      <UnlockFilled onClick={() => clickResetPassword(user)} />
                    </Tooltip>,
                    <Tooltip title={<span>Delete</span>}>
                      <DeleteFilled
                        onClick={() => showConfirm(user.id)}
                        style={{ color: "#ff4d4f" }}
                      />
                    </Tooltip>,
                  ]}
                >
                  <Meta
                    title="User Name"
                    description={user.first_name + " " + user.last_name}
                  />
                </Card>
              ))}
          </div>
          <Space className="mobile-assetType-pagination">
            <Button
              onClick={() => onPrev()}
              disabled={currentPage == 1 ? true : false}
            >
              Prev
            </Button>
            <Button type="primary">{currentPage}</Button>
            <Button
              onClick={() => onNext()}
              disabled={!hasNext || currentPage * size >= total}
            >
              Next
            </Button>
          </Space>
        </>
      )}

      {showEditCampaignUser && (
        <CreateCampaignUserScreen
          setShowEditCampaignUser={setShowEditCampaignUser}
          id={showEditCampaignUser}
          fetchUsers={fetchUsers}
        />
      )}
      {open && (
        <CreateCampaignUserScreen setOpen={setOpen} fetchUsers={fetchUsers} />
      )}
      {openReset && (
        <ResetPassword
          setShowResetPassword={setShowResetPassword}
          id={showResetPassword}
          setOpenReset={setOpenReset}
          openReset={openReset}
          showResetPassword={showResetPassword}
        />
      )}
    </>
  );
};
export default CampaignTable;
