import { Form, Input, Button, Select, Drawer, notification } from "antd";
import { useState } from "react";
import "./style.scss";
import { getCampaignUsers } from "../../redux/actions/campaignUserActions";
import { resetPassword } from "../../redux/actions/authActions";
const { Option } = Select;

const ResetPassword = ({
  setOpenReset,
  setShowResetPassword,
  id,
  setUsers,
  openReset,
  showResetPassword,
}) => {
  const [loading, setLoading] = useState(false);
  const fetchUsers = () => {
    getCampaignUsers()
      .then((result) => {
        setUsers(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onFinish = (values) => {
    setLoading(true);
    resetPassword(id, values)
      .then((result) => {
        setLoading(false);
        setOpenReset(false);
        setShowResetPassword(null);
        fetchUsers();
        notification.success({
          message: "Reset Password successfully",
        });
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const closeReset = () => {
    setShowResetPassword(null);
    setOpenReset(false);
  };
  return (
    <Drawer
      width={400}
      open={openReset}
      onClose={closeReset}
      className="create-asset-page"
      title="Reset Password"
    >
      <Form onFinish={onFinish} layout="vertical">
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
          <Input.Password placeholder="Password" name="password" size="large" />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirm_password"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Password" name="password" size="large" />
        </Form.Item>
        <Form.Item>
          <Button
            className="btn-submit"
            type="primary"
            htmlType="submit"
            loading={loading}
            size="large"
            block
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
export default ResetPassword;
