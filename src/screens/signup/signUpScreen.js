import { Row, Col, Button, Form, Input, Checkbox, Typography } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/actions/authActions";
import "./style.scss";
import { get } from "lodash";
import { DASHBOARD, LOGIN } from "../../constants/routes";
import { Navigate, useNavigate } from "react-router-dom";
import img1 from "../../assets/images/img1.png";
import logo from "../../assets/images/sl-logo.png";
const SignUpScreen = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => get(state, "auth.isLoggedIn"));
  if (isLoggedIn) {
    return <Navigate to={DASHBOARD} />;
  }

  const onFinish = (values) => {
    const data = { ...values, subdomain: window.location.hostname };
    setLoading(true);
    dispatch(
      signup(
        data,
        () => {
          setLoading(false);
          navigate(DASHBOARD);
        },
        (error) => {
          setLoading(false);
        }
      )
    );
  };
  const onLogin = () => {
    navigate(LOGIN);
  };
  return (
    <div className="signup-container">
      <Row>
        <Col xs={24} sm={24} md={13}>
          <div className="left-container">
            <div className="left-logo">
              <img src={logo} alt="logo" width={60} />
              <h1 className="title1">Super Label</h1>
            </div>
            <div className="login-img">
              <img src={img1} alt="" />
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={11}>
          <div className="right-section">
            <div className="sm-logo">
              <img src={logo} alt="logo" width={60} />
            </div>
            <div className="heading-section">
              <Typography.Title level={3}>Create your account</Typography.Title>
              <Typography.Text>It's free and easy</Typography.Text>
            </div>
            <div className="signup-form">
              <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                  label="First name"
                  name="first_name"
                  rules={[
                    { required: true, message: "First name is required" },
                    { whitespace: true },
                  ]}
                >
                  <Input
                    placeholder={"Example"}
                    name="first_name"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  label="Last name"
                  name="last_name"
                  rules={[
                    { required: true, message: "Last name is required" },
                    { whitespace: true },
                  ]}
                >
                  <Input
                    placeholder={"Example"}
                    name="last_name"
                    size="large"
                  />
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
                  <Input placeholder={"Email"} name="email" size="large" />
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
                    Register
                  </Button>
                </Form.Item>

                <Form.Item className="login-btn">
                  Already Registerd?
                  <Button type="link" onClick={() => onLogin()}>
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default SignUpScreen;
