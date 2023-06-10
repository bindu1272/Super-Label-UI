import {
  Form,
  Input,
  Button,
  Select,
  Drawer,
  notification,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import "./style.scss";
import {
  postCampaignUser,
  getCampaignUsers,
  fetchCampaignUserById,
  updateCampaignUser,
} from "../../redux/actions/campaignUserActions";
const { Option } = Select;

const CreateCampaignUserScreen = ({ setOpen, setShowEditCampaignUser, id,fetchUsers }) => {
  const dateFormat = "DD-MM-YYYY";
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [selectedRole, setSelectedRole] = useState();
  const userRoles = {
    1:{name : "ADMIN"},
    2:{name : "MEMBER"},
    3:{name : "DRIVER"}
  }
  useEffect(() => {
    if (id) {
    setLoading(true);
      fetchCampaignUserById(id).then((result) => {
        setLoading(false);
        const data = {...result,roles : userRoles[result?.roles]?.name}
        form.setFieldsValue(data);
        setInitialValues(result);
      });
    }
  }, [id]);
  const onFinish = (values) => {
    setLoading(true);
    let dataValues = {};
    dataValues = { ...values, roles: selectedRole };
    if (id) {
      updateCampaignUser(id, dataValues)
        .then((result) => {
          fetchUsers();
          notification.success({
            message: "Campaign User updated successfully",
          });
          setLoading(false);
          setShowEditCampaignUser(null);
          fetchUsers();
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      postCampaignUser(dataValues)
        .then((result) => {
          setLoading(false);
          setOpen(false);
          notification.success({
            message: "Campaign User created successfully",
          });
          fetchUsers();
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };
  const changeRoleHandler = (role) => {
    setSelectedRole(role?.value);
  };
  return (
    <Drawer
      width={400}
      open={true}
      onClose={() => (id ? setShowEditCampaignUser(null) : setOpen(false))}
      className="create-asset-page"
      title={`${id ? "Update" : "Create"} User`}
    >
      {
        loading ? 
        <Spin/>
        :
        <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[
            { required: true, message: "First Name is required" },
            { whitespace: true },
          ]}
        >
          <Input placeholder={"Example"} name="first_name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[
            { required: true, message: "Last Name is required" },
            { whitespace: true },
          ]}
        >
          <Input placeholder={"Example"} name="last_name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail "
          rules={[
            { required: true, message: "Email is required" },
            { whitespace: true },
            {
              pattern: new RegExp(
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
              ),
              message: "Email is not valid",
            },
          ]}
        >
          <Input placeholder={"Email"} name="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Password is required" },
            {
              min: 6,
              message: "Password must be at least 6 characters long",
            },
          ]}
        >
          <Input.Password placeholder="Password" name="password"/>
        </Form.Item>
        <Form.Item
          label="Role"
          name="roles"
          rules={[
            {
              required: true,
              message: "Role is required",
            },
          ]}
        >
          <Select
            placeholder="Select Role"
            labelInValue
            style={{ width: "100%" }}
            onChange={changeRoleHandler}
          >
            <Option key="ADMIN" value="ADMIN">
              ADMIN
            </Option>
            <Option key="MEMBER" value="MEMBER">
              MEMBER
            </Option>
            <Option key="DRIVER" value="DRIVER">
              DRIVER
            </Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            className="btn-submit"
            type="primary"
            htmlType="submit"
            loading={loading}
            block
          >
            Submit
          </Button>
        </Form.Item>
      </Form>

      }
     
    </Drawer>
  );
};
export default CreateCampaignUserScreen;
