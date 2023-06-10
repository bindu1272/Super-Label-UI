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
  Dropdown,
} from "antd";
import { useEffect, useState } from "react";
import CreateCampaignScreen from "../../screens/campaigns/createCampaignScreen";
import { useDispatch, useSelector } from "react-redux";
import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import "./style.scss";
import {
  postCampaign,
  getCampaigns,
  deleteCampaignById,
  campaignManifest,
  campaignDownloadManifest,
} from "../../redux/actions/campaignActions";
import UploadDistroScreen from "../../screens/campaigns/uploadDistroScreen";
import DownloadDistroScreen from "../../screens/campaigns/downloadDistroScreen";
import { roles } from "../../constants/roles";
import get from "lodash/get";
import CustomTag from "../../components/tag/CustomTag";
import map from "lodash/map";
import { FilterOutlined } from '@ant-design/icons';
import {
  PlusOutlined,
  EditOutlined,
  UploadOutlined,
  ExclamationCircleFilled,
  DeleteOutlined,
  EllipsisOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import DownloadManifestPDFScreen from "../../screens/campaigns/downloadManifestPDFScreen";
const { Meta } = Card;
const { Paragraph } = Typography;

const CampaignTable = () => {
  const [showEditCampaign, setShowEditCampaign] = useState(null);
  const [showUploadDistro, setShowUploadDistro] = useState(null);
  const [showDownloadDistro, setShowDownloadDistro] = useState(null);
  const [showDownloadManifestPDF, setShowDownloadManifestPDF] = useState(null);
  const [showManifest, setShowManifest] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [campaigns, setCampaigns] = useState();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [startKey, setStartKey] = useState(1);
  const [prevKey, setPrevKey] = useState(0);
  const [total, setTotal] = useState();
  const [hasNext, setHasNext] = useState(true);

  const [data, setData] = useState([]); // Your table data
  const [filteredData, setFilteredData] = useState([]); // Filtered data
  const [searchText, setSearchText] = useState('');
  const [searchColumn, setSearchColumn] = useState('');


  const user = useSelector((state) => get(state, "auth.user"));
  const size = 20;
  const [open, setOpen] = useState(false);

  const media = window.matchMedia(`(min-width: 768px)`);
  const createCampaign = () => {
    setOpen(true);
  };

  const fetchCampaigns = () => {
    setLoading(true);
    let params = {
      page: currentPage,
      startKey: startKey,
      prevKey: prevKey === 0 ? null : prevKey,
    };
    if (searchValue) {
      params["name"] = searchValue;
    }
    getCampaigns(params)
      .then((result) => {
        setCampaigns(result?.data);
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
      params["name"] = searchValue;
    }
    getCampaigns(params)
      .then((result) => {
        setHasNext(result?.data?.length >= size);
        setCampaigns(result?.data);
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
          Do you want to delete this Campaign? <br />
          This can't be undone
        </>
      ),
      icon: <ExclamationCircleFilled />,
      onOk() {
        deleteCampaign(id);
      },
      okText: "Delete",
      okType: "danger",
      okButtonProps: { icon: <DeleteOutlined /> },
    });
  };

  const deleteCampaign = (id) => {
    setLoading(true);
    deleteCampaignById(id)
      .then((res) => {
        setLoading(false);
        notification.success({
          message: "Deleted Campaign Successfully",
        });
        fetchCampaigns();
      })
      .catch(() => {});
  };
  const onClickManifest = (id) => {
    setLoading(true);
    campaignManifest(id)
      .then((res) => {
        setLoading(false);
        notification.success({
          message: "manifested Successfully",
        });
        fetchCampaigns();
      })
      .catch(() => {});
  };
  const onClickDownloadManifest = (id) => {
    setLoading(true);
    campaignDownloadManifest(id)
      .then((res) => {
        setLoading(false);
        setShowDownloadManifestPDF(id);
      })
      .catch(() => {});
  };
 

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<FilterOutlined />}
            size="medium"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchColumn(dataIndex);
    const filteredData = data.filter((record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(selectedKeys[0].toLowerCase()) : ''
    );
    setFilteredData(filteredData);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
    setSearchColumn('');
    setFilteredData(data);
  };

  const columns = [
    {
      title: "Campaign Id",
      dataIndex: "campaign_id",
      key: "campaign_id",
    },
    {
      title: "Campaign Name",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <Typography.Text ellipsis={{ tooltip: true }} style={{ width: "95%" }}>
          {name}
        </Typography.Text>
      ),
    },
    {
      title: "Job Number",
      dataIndex: "job_number",
      key: "job_number",
    },
    {
      title: "Dispatch Date",
      dataIndex: "dispatch_date",
      key: "dispatch_date",
    },
    {
      title: "Status",
      key: "status",
      render: (record) => <CustomTag status={get(record, "status")} hover={get(record, "status_error")} />,
      ...getColumnSearchProps('status')
    },

    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      render: (props) => {
        return (
          <Space>
            {user?.["roles"] === 1 && (
              <>
                <Button
                  type="primary"
                  onClick={() => setShowEditCampaign(props?.id)}
                >
                  Edit
                </Button>
                {props?.status !== "Manifest Complete" && (
                  <Button onClick={() => setShowUploadDistro(props?.id)}>
                    Upload Distro
                  </Button>
                )}
                {props?.download_distro !== null &&
                  (props?.status === "Manifest Ready" ||
                    props?.status === "Manifest Complete") && (
                    <Button onClick={() => setShowDownloadDistro(props?.id)}>
                      Download Labels
                    </Button>
                  )}

                {props?.status === "Manifest Ready" && (
                  <Button onClick={() => onClickManifest(props?.id)}>
                    Manifest
                  </Button>
                )}
                {(props?.status === "Manifest Complete" ||
                  props?.status === "Manifest Process") && (
                  <Button onClick={() => onClickDownloadManifest(props?.id)}>
                    Download Manifest Label
                  </Button>
                )}

                <Button onClick={() => showConfirm(props?.id)} danger>
                  Delete
                </Button>
              </>
            )}
            {user?.["roles"] === 3 && (
              <>
                {props?.status === "Manifest Ready" && (
                  <Button onClick={() => onClickManifest(props?.id)}>
                    Manifest
                  </Button>
                )}
                {(props?.status === "Manifest Complete" ||
                  props?.status === "Manifest Process") && (
                  <Button onClick={() => onClickDownloadManifest(props?.id)}>
                    Download Manifest Label
                  </Button>
                )}
              </>
            )}
            {user?.["roles"] === 2 && (
              <>
                <Button
                  type="primary"
                  onClick={() => setShowEditCampaign(props?.id)}
                >
                  Edit
                </Button>
                {props?.status !== "Manifest Complete" && (
                  <Button onClick={() => setShowUploadDistro(props?.id)}>
                    Upload Distro
                  </Button>
                )}
                {props?.download_distro !== null &&
                  (props?.status === "Manifest Ready" ||
                    props?.status === "Manifest Complete") && (
                    <Button onClick={() => setShowDownloadDistro(props?.id)}>
                      Download Labels
                    </Button>
                  )}
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
    getCampaigns(params).then((result) => {
      setLoading(false);
      setCampaigns(result?.data);
      setCurrentPage(1);
      setTotal(result?.meta?.pagination?.total);
    });
  };

  const handleRefresh = () => {
    fetchCampaigns();
  };
  return (
    <>
      <div className="header">
        <Typography.Title level={4} className="page-title">
          Campaigns
        </Typography.Title>
        <Input
          placeholder="Search "
          onChange={(e) => setSearchValue(e.target.value)}
          onPressEnter={() => onSearch()}
          className="search-bar"
          prefix={<SearchOutlined style={{ color: "grey" }} />}
        />
        <Tooltip title={"Refresh"}>
        <Button onClick={handleRefresh} style={{ marginRight: "5px" }}>
        <ReloadOutlined />
        </Button>
        </Tooltip>
        {(user?.["roles"] == roles?.ADMIN?.value ||
          user?.["roles"] == roles?.MEMBER?.value) && (
          <div className="right-section">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={createCampaign}
            >
              Create Campaign
            </Button>
          </div>
        )}
      </div>
      <Input
        placeholder="Search Campaign Name"
        onChange={(e) => setSearchValue(e.target.value)}
        onPressEnter={() => onSearch()}
        className="mobile-search-bar"
        prefix={<SearchOutlined style={{ color: "grey" }} />}
      />
      {media.matches ? (
        <Table
          columns={columns}
          dataSource={campaigns}
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
      ) : (
        <>
          <div className="assetType-card">
            {campaigns &&
              map(campaigns, (campaign) => (
                <Card
                  style={{
                    width: "100%",
                    margin: "16px auto",
                  }}
                  title={campaign.name}
                  actions={
                    user?.["roles"] === 3
                      ? [
                          campaign.status === "Manifest Ready" && (
                            <Tooltip title={<span>Manifest</span>}>
                              <UploadOutlined
                                onClick={() => setShowManifest(campaign.id)}
                              />
                            </Tooltip>
                          ),
                          (campaign.status === "Manifest Complete" ||
                            campaign.status === "Manifest Process") && (
                            <Tooltip
                              title={<span> Download Manifest Label</span>}
                            >
                              <DownloadOutlined
                                onClick={() =>
                                  onClickDownloadManifest(campaign.id)
                                }
                              />
                            </Tooltip>
                          ),
                        ]
                      : user?.["roles"] === 1
                      ? [
                          <Tooltip title={<span>Edit</span>}>
                            <EditOutlined
                              onClick={() => setShowEditCampaign(campaign.id)}
                            />
                          </Tooltip>,
                          campaign?.status !== "Manifest Complete" && (
                            <Tooltip title={<span>Upload distro</span>}>
                              <UploadOutlined
                                onClick={() => setShowUploadDistro(campaign.id)}
                              />
                            </Tooltip>
                          ),
                          <Dropdown
                            menu={{
                              items: [
                                campaign.download_distro !== null &&
                                  (campaign.status === "Manifest Ready" ||
                                    campaign.status ===
                                      "Manifest Complete") && {
                                    label: "Download Labels",
                                    onClick: () =>
                                      setShowDownloadDistro(campaign.id),
                                  },
                                campaign.status === "Manifest Ready" && {
                                  label: "Manifest",
                                  onClick: () => setShowManifest(campaign.id),
                                },
                                (campaign.status === "Manifest Complete" ||
                                  campaign.status === "Manifest Process") && {
                                  label: " Download Manifest Label",
                                  onClick: () =>
                                    onClickDownloadManifest(campaign.id),
                                },
                                {
                                  label: "Delete",
                                  onClick: () => showConfirm(campaign.id),
                                  danger: true,
                                },
                              ],
                            }}
                          >
                            <EllipsisOutlined />
                          </Dropdown>,
                        ]
                      : [
                          <Tooltip title={<span>Edit</span>}>
                            <EditOutlined
                              onClick={() => setShowEditCampaign(campaign.id)}
                            />
                          </Tooltip>,
                          campaign.status !== "Manifest Complete" && (
                            <Tooltip title={<span>Upload distro</span>}>
                              <UploadOutlined
                                onClick={() => setShowUploadDistro(campaign.id)}
                              />
                            </Tooltip>
                          ),
                          <Dropdown
                            menu={{
                              items: [
                                campaign.download_distro !== null &&
                                  campaign.status === "Manifest Ready" && {
                                    label: "Download Labels",
                                    onClick: () =>
                                      setShowDownloadDistro(campaign.id),
                                  },
                                campaign.status === "Manifest Ready" && {
                                  label: "Manifest",
                                  onClick: () => setShowManifest(campaign.id),
                                },
                                (campaign.status === "Manifest Complete" ||
                                  campaign.status === "Manifest Process") && {
                                  label: " Download Manifest Label",
                                  onClick: () =>
                                    onClickDownloadManifest(campaign.id),
                                },
                                {
                                  label: "Delete",
                                  onClick: () => showConfirm(campaign.id),
                                  danger: true,
                                },
                              ],
                            }}
                          >
                            <EllipsisOutlined />
                          </Dropdown>,
                        ]
                  }
                >
                  <Row justify="space-between">
                    <Col span={11}>
                      <Paragraph>
                        <strong>Id </strong>
                      </Paragraph>
                    </Col>
                    <Col span={11}>
                      <Paragraph>
                        <strong>Job Number </strong>
                      </Paragraph>
                    </Col>
                  </Row>
                  <Row justify="space-between">
                    <Col span={11}>
                      <Paragraph>{campaign.campaign_id}</Paragraph>
                    </Col>
                    <Col span={11}>
                      <Paragraph>{campaign.job_number}</Paragraph>
                    </Col>
                  </Row>
                  <Row justify="space-between">
                    <Col span={11}>
                      <Paragraph>
                        <strong>Dispatch Date </strong>
                      </Paragraph>
                    </Col>
                    <Col span={11}>
                      <Paragraph>
                        <strong>Status </strong>
                      </Paragraph>
                    </Col>
                  </Row>
                  <Row justify="space-between">
                    <Col span={11}>
                      <Paragraph>{campaign.dispatch_date}</Paragraph>
                    </Col>
                    <Col span={11}>
                      <Paragraph>
                        {<CustomTag status={campaign.status} />}
                      </Paragraph>
                    </Col>
                  </Row>
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
      {showEditCampaign && (
        <CreateCampaignScreen
          setShowEditCampaign={setShowEditCampaign}
          id={showEditCampaign}
          fetchCampaigns={fetchCampaigns}
        />
      )}
      {open && (
        <CreateCampaignScreen
          setOpen={setOpen}
          fetchCampaigns={fetchCampaigns}
        />
      )}
      {showUploadDistro && (
        <UploadDistroScreen
          setShowUploadDistro={setShowUploadDistro}
          id={showUploadDistro}
          fetchCampaigns={fetchCampaigns}
        />
      )}
      {showDownloadDistro && (
        <DownloadDistroScreen
          setShowDownloadDistro={setShowDownloadDistro}
          id={showDownloadDistro}
        />
      )}
      {showDownloadManifestPDF && (
        <DownloadManifestPDFScreen
          setShowDownloadManifestPDF={setShowDownloadManifestPDF}
          id={showDownloadManifestPDF}
        />
      )}
    </>
  );
};
export default CampaignTable;
