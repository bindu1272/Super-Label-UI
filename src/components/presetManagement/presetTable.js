import {
    Button,
    Space,
    Table,
    Input,
    notification,
    message,
    Typography,
    Modal,
  } from "antd";
  import { useEffect, useState } from "react";
  import CreatePresetScreen from "../../screens/presetManagement/createPresetScreen";
  import { useSelector } from "react-redux";
  import { SearchOutlined } from "@ant-design/icons";
  import "./style.scss";
  import { getPresets,deletePreset, } from "../../redux/actions/presetActions";
  import { roles } from "../../constants/roles";
  import get from "lodash/get";
  import { FilterOutlined } from '@ant-design/icons';
  import {
    PlusOutlined,
    ExclamationCircleFilled,
    DeleteOutlined,
  } from "@ant-design/icons";
  
  const PresetTable = () => {   
    const [showEditPreset, setShowEditPreset] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [presets, setPresets] = useState();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [startKey, setStartKey] = useState(1);
    const [prevKey, setPrevKey] = useState(0);
    const [total, setTotal] = useState();
    const [hasNext, setHasNext] = useState(true);
    const [data, setData] = useState([]); // Your table data
  
    const user = useSelector((state) => get(state, "auth.user"));
    const size = 20;
    const [open, setOpen] = useState(false);
  
    const media = window.matchMedia(`(min-width: 768px)`);
    const createPreset = () => {
      setOpen(true);
    };
  
    const fetchPresets = () => {
      setLoading(true);
      let params = {
        page: currentPage,
        startKey: startKey,
        prevKey: prevKey === 0 ? null : prevKey,
      };
      if (searchValue) {
        params["preset"] = searchValue;
      }
      getPresets(params)
        .then((result) => {
          setPresets(result?.data);
          setCurrentPage(result?.meta?.pagination?.current_page);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    };
    useEffect(() => {
      setLoading(true);
      let params = {
        page: currentPage,
        startKey: startKey,
        prevKey: prevKey === 0 ? null : prevKey,
      };
      if (searchValue) {
        params["preset"] = searchValue;
      }
      getPresets(params)
        .then((result) => {
          setHasNext(result?.data?.length >= size);
          setPresets(result?.data);
          // setCurrentPage(result?.meta?.pagination?.current_page);
          setTotal(result?.meta?.pagination?.total);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }, [currentPage]);
    const showConfirm = (id) => {
      Modal.confirm({
        title: (
          <>
            Do you want to delete this Preset? <br />
            This can't be undone
          </>
        ),
        icon: <ExclamationCircleFilled />,
        onOk() {
            deletePresetById(id);
        },
        okText: "Delete",
        okType: "danger",
        okButtonProps: { icon: <DeleteOutlined /> },
      });
    };
  
    const deletePresetById = (id) => {
      setLoading(true);
      deletePreset(id)
        .then((res) => {
          setLoading(false);
          notification.success({
            message: "Deleted Preset Successfully",
          });
          fetchPresets();
        })
        .catch(() => {});
    };
  
    const columns = [
      {
        title: "Preset",
        dataIndex: "preset",
        key: "preset",
        render: (name) => (
          <Typography.Text ellipsis={{ tooltip: true }} style={{ width: "95%" }}>
            {name}
          </Typography.Text>
        ),
      },
      {
        title: "Width",
        dataIndex: "width",
        key: "width",
      },
      {
        title: "Height",
        dataIndex: "height",
        key: "height",
      },
      {
        title: "Thickness",
        dataIndex: "thickness",
        key: "thickness",
      },
      {
        title: "Actions",
        dataIndex: "",
        key: "actions",
        render: (props) => {
          return (
            <Space>
                <>
                  <Button
                    type="primary"
                    onClick={() => setShowEditPreset(props?.id)}
                  >
                    Edit
                  </Button>
                  <Button onClick={() => showConfirm(props?.id)} danger>
                    Delete
                  </Button>
                </>
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
        params["preset"] = searchValue;
      }
      setLoading(true);
      getPresets(params).then((result) => {
        setLoading(false);
        setPresets(result?.data);
        setCurrentPage(1);
        setTotal(result?.meta?.pagination?.total);
      });
    };
  
    return (
      <>
        <div className="header">
          <Typography.Title level={4} className="page-title">
            Presets
          </Typography.Title>
          <Input
            placeholder="Search "
            onChange={(e) => setSearchValue(e.target.value)}
            onPressEnter={() => onSearch()}
            className="search-bar"
            prefix={<SearchOutlined style={{ color: "grey" }} />}
          />
          {(user?.["roles"] == roles?.ADMIN?.value ||
            user?.["roles"] == roles?.MEMBER?.value) && (
            <div className="right-section">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={createPreset}
              >
                Create Preset
              </Button>
            </div>
          )}
        </div>
        <Input
          placeholder="Search"
          onChange={(e) => setSearchValue(e.target.value)}
          onPressEnter={() => onSearch()}
          className="mobile-search-bar"
          prefix={<SearchOutlined style={{ color: "grey" }} />}
        />
          <Table
            columns={columns}
            dataSource={presets}
            pagination={false}
            className="assetType-table"
            loading={loading}
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
        {showEditPreset && (
          <CreatePresetScreen
            setShowEditPreset={setShowEditPreset}
            id={showEditPreset}
            fetchPresets={fetchPresets}
          />
        )}
        {open && (
          <CreatePresetScreen
            setOpen={setOpen}
            fetchPresets={fetchPresets}
          />
        )}
      </>
    );
  };
  export default PresetTable;
  