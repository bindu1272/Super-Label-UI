import {
  Form,
  Input,
  Button,
  Select,
  Drawer,
  notification,
  DatePicker,
  message,
  Spin
} from "antd";
import { useEffect, useState } from "react";
import "./style.scss";
import dayjs from "dayjs";
import {
  postCampaign,
  getCampaigns,
  fetchCampaignById,
  updateCampaign,
} from "../../redux/actions/campaignActions";
import loadingIcon from "../../utilities/icons/LoadingIcon";
import { LoadingOutlined } from "@ant-design/icons";
import { Country, WhoPays } from "../../constants/createCampaignConstants";
import { FREIGHTSERVICECONSTANTS } from "../../constants/freightServiceConstants";
const { Option } = Select;

const CreateCampaignScreen = ({ setOpen, setShowEditCampaign, id ,fetchCampaigns}) => {
  const dateFormat = "DD-MM-YYYY";
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [who_pays, setWho_pays] = useState(null);
  const [country, setCountry] = useState(null);
  const [commercial, setCommercial] = useState(null);
  const [freightServiceCode,setFreightServiceCode] = useState(null);
  useEffect(() => {
    if (id) {
    setLoading(true);
      fetchCampaignById(id).then((result) => {
        setLoading(false);
        form.setFieldsValue(result);
        setInitialValues(result);
        // if (result?.who_pays === WhoPays?.CLIENT?.value) {
          setWho_pays(result?.who_pays);
        // }
        // if (result?.country === Country?.NEWZEALAND?.value) {
          setCountry(result?.country);
          setFreightServiceCode(result?.freight_service_code);
        // }
      });
    }
  }, [id]);
  const onFinish = (values) => {
    setLoading(true);
    let dataValues = {};
    if (who_pays === WhoPays?.DASHING?.value) {
      dataValues = {
        ...values,
        who_pays: who_pays,
        client_charge_amount: null,
        country: country,
        commercial_value: commercial,
        freight_service_code: freightServiceCode
      };
    } else {
      dataValues = {
        ...values,
        who_pays: who_pays,
        country: country,
        commercial_value: commercial,
        freight_service_code: freightServiceCode
      };
    }
    if (country === Country?.AUSTRALIA?.value) {
      dataValues = {
        ...values,
        who_pays: who_pays,
        freight_service_code: freightServiceCode,
        export_description: null,
        export_origin: null,
        contents_desc: null,
        contents_qty: null,
        contents_$aud: null,
        contents_weight: null,
        country: country,
        commercial_value: null,
      };
    } else {
      dataValues = {
        ...values,
        who_pays: who_pays,
        country: country,
        commercial_value: commercial,
        freight_service_code: freightServiceCode
      };
    }
    if (id) {
      setLoading(true);
      updateCampaign(id, dataValues)
        .then((result) => {
          notification.success({
            message: "Campaign updated successfully",
          });
          setLoading(false);
          setShowEditCampaign(null);
          fetchCampaigns();
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      postCampaign(dataValues)
        .then((result) => {
          setLoading(false);
          setOpen(false);
          notification.success({
            message: "Campaign created successfully",
          });
          fetchCampaigns();
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };
  const changeHandler = (who_pays) => {
    setWho_pays(who_pays?.value);
  };
  const changeCountryHandler = (country) => {
    setCountry(country?.value);
  };
  const changeCommercialHandler = (commercial) => {
    setCommercial(commercial?.value);
  };

  const changeFreightServiceHandler=(service)=>{
    setFreightServiceCode(service?.value);
  }
  return (
    <Drawer
      width={400}
      open={true}
      onClose={() => (id ? setShowEditCampaign(null) : setOpen(false))}
      className="create-asset-page"
      title={`${id ? "Update" : "Create"} Campaign`}
    >
      {loading ? 
      (
        <div className="items-loader">
        <Spin />
        </div>
      )
      :(
      <Form layout="vertical" className="form" form={form} onFinish={onFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Name is required",
            },
          ]}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="dispatch_date"
          label="Dispatch Date "
          rules={[
            {
              required: true,
              message: "Dispatch Date is required",
            },
          ]}
          // getValueFromEvent={(onChange) => dayjs(onChange).format("YYYY-MM-DD")}
          // getValueProps={(i) => ({ value: dayjs(i) })}
          getValueFromEvent={(e) =>
            e ? dayjs(e).format("YYYY-MM-DD") : null
          }
          getValueProps={(i) => ({ value: i ? dayjs(i) : null })}
        >
          <DatePicker
            // value={dayjs(dispatch_date, dateFormat)}
            format={dateFormat} 
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          label="Job Number"
          name="job_number"
          rules={[
            {
              required: true,
              message: "Job Number is required",
            },
          ]}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Who Pays"
          name="who_pays"
          rules={[
            {
              required: true,
              message: "Who Pays is required",
            },
          ]}
        >
          <Select
            placeholder="Select Option who pays"
            labelInValue
            style={{ width: "100%" }}
            onChange={changeHandler}
          >
            <Option key="dashing" value="dashing">
              Dashing
            </Option>
            <Option key="client" value="client">
              Client
            </Option>
          </Select>
        </Form.Item>
        {who_pays === "client" && (
          <Form.Item
            label="Client Charge Amount"
            name="client_charge_amount"
            rules={[
              {
                required: true,
                message: "Client Charge Amount is required",
              },
            ]}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
        )}
        {/* <Form.Item
          label="Freight Service Code"
          name="freight_service_code"
          rules={[
            {
              required: true,
              message: "Freight Service Code is required",
            },
          ]}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item> */}

        <Form.Item
          name="freight_service_code"
          label="Freight Service Code"
          rules={[
            {
              required: true,
              message: "Freight Service Code is required",
            },
          ]}
        >
          <Select
            placeholder="Select Freight Service Code"
            labelInValue
            style={{ width: "100%" }}
            onChange={changeFreightServiceHandler}
          >
            {
              FREIGHTSERVICECONSTANTS?.map((item,index)=>{
                return(
                  <Option key={index} value={item?.service_code}>
              {item?.carrier} {item?.service_name}
            </Option>
                )
              })
            }
           
          </Select>
        </Form.Item>
        <Form.Item
          // valuePropName={editData?.birth_country}
          name="country"
          label="Country"
          rules={[
            {
              required: true,
              message: "Country is required",
            },
          ]}
        >
          <Select
            placeholder="Select Country"
            labelInValue
            style={{ width: "100%" }}
            onChange={changeCountryHandler}
          >
            <Option key="australia" value="australia">
              Australia
            </Option>
            <Option key="newzealand" value="newzealand">
              New Zealand
            </Option>
          </Select>
        </Form.Item>
        {country === "newzealand" && (
          <>
            <Form.Item
              // valuePropName={editData?.birth_country}
              name="commercial_value"
              label="Commercial Value"
              rules={[
                {
                  required: true,
                  message: "Commercial Value is required",
                },
              ]}
            >
              <Select
                placeholder="Select Commercial Value"
                labelInValue
                style={{ width: "100%" }}
                onChange={changeCommercialHandler}
              >
                <Option key="0" value="0">
                  0
                </Option>
                <Option key="1" value="1">
                  1
                </Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Export Description"
              name="export_description"
              rules={[
                {
                  required: true,
                  message: "Export Description is required",
                },
              ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Export Origin"
              name="export_origin"
              rules={[
                {
                  required: true,
                  message: "Export Origin is required",
                },
              ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Contents Desc"
              name="contents_desc"
              rules={[
                {
                  required: true,
                  message: "Contents Desc is required",
                },
              ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Contents Qty"
              name="contents_qty"
              rules={[
                {
                  required: true,
                  message: "Contents Qty is required",
                },
              ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Contents $AUD"
              name="contents_$AUD"
              rules={[
                {
                  required: true,
                  message: "Contents $AUD is required",
                },
              ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Contents Weight"
              name="contents_weight"
              rules={[
                {
                  required: true,
                  message: "Contents Weight is required",
                },
              ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </>
        )}
        <Button
          type="primary"
          block
          style={{ marginLeft: "auto" }}
          htmlType="submit"
          loading={loading}
        >
          Submit
        </Button>
      </Form>
      )}
    </Drawer>
  );
};
export default CreateCampaignScreen;
