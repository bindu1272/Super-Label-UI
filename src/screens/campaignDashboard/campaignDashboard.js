import { Button, Form, Modal, Typography, Input } from "antd";
import "./style.scss";
import { useState } from "react";
import requireAuth from "../../hocs/requireAuth";
import { changeDefaultPassword } from "../../redux/actions/authActions";
import { useSelector } from "react-redux";

const CampaignDashboard = () => {
  const [closeModal, setCloseModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state?.auth?.user);
  const onFinish = (values) => {
    changeDefaultPassword(user?.id, values)
      .then((result) => {
        setOpenModal(false);
      })
      .catch((err) => {});
  };
  const [openModal, setOpenModal] = useState(user?.is_default_login);
  return (
    <div className="asset-management-page">
      <div className="header">
        <Typography.Title level={4} className="page-title">
          Campaign Dashboard
        </Typography.Title>
      </div>
      <Modal
        open={openModal}
        footer={null}
        maskClosable={true}
        cancelButtonProps={{ style: { display: "none" } }}
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
            <Input.Password
              placeholder="Password"
              name="password"
              size="large"
            />
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
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Password"
              name="password"
              size="large"
            />
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
      </Modal>
    </div>
  );
};
export default requireAuth(CampaignDashboard);
