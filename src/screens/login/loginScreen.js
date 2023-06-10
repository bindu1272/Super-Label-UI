import { Button, Col, Row, Spin, Form, Input, Typography, Divider } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { DASHBOARD, FORGOT_PASSWORD, SIGN_UP,CAMPAIGN_DASHBOARD,CHANGE_DEFAULT_PASSWORD,CAMPAIGN_SCREEN } from "../../constants/routes";
import { login } from "../../redux/actions/authActions";
import get from "lodash/get";
import img1 from "../../assets/images/img1.png";
import logo from "../../assets/images/sl-logo.png";
import "./style.scss";
const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const isLoggedIn = useSelector((state) => get(state, "auth.isLoggedIn"));
  const user = useSelector((state)=>state?.auth?.user);
  // if(isLoggedIn && user?.is_default_login){
  //   return <Navigate to={CHANGE_DEFAULT_PASSWORD} />;
  // }else 
  if (isLoggedIn) {
    return <Navigate to={CAMPAIGN_SCREEN} />;
  }

  const onFinish = (values) => {
    setLoading(true);
    dispatch(
      login(
        {
          ...values,
        },
        () => {
          setLoading(false);
          navigate(DASHBOARD);
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  const handleForgotPassword = () => {
    navigate(FORGOT_PASSWORD);
  };

  const onSignUp = () => {
    navigate(SIGN_UP);
  };

  const onForgotPassword = () => {
    navigate(FORGOT_PASSWORD);
  };

  return (
    <div className="login-container">
      <Row>
        <Col xs={24} sm={24} md={13}>
          <div className="left-container">
            <div className="left-logo">
          <img src={logo} alt="logo" width={60}/><h1 className="title1">
          Super Label
            </h1>
            </div>
            <div className="login-img">
            <img src={img1} alt=""/>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={11} className="login-form">
        <div className="sm-logo">
        <img src={logo} alt="logo" width={60} />
      </div>
          <Typography.Title className="title">Login</Typography.Title>
          <Form name="basic" layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email is required",
                },
                {
                  pattern: new RegExp(
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                  ),
                  message: "Email is not valid",
                },
              ]}
            >
              <Input className="custom-input" size="large" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Password is required",
                },
                {
                  min: 6,
                  message: "Password must be atleast 6 characters",
                },
              ]}
            >
              <Input.Password className="custom-input" size="large" />
            </Form.Item>
            {/* <Row justify="space-between">
              <Col></Col>
              <Col>
                <Button
                  className="forgot-pwd-btn"
                  type="link"
                  onClick={() => onForgotPassword()}
                >
                  Forgot password?
                </Button>
              </Col>
            </Row> */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="full-button"
                block
                loading={loading}
              >
                Login
              </Button>
            </Form.Item>
            {/* <Divider>OR</Divider> */}
            {/* <Form.Item>
              <div className="signup-btn">
                <span>
                  Don't have an account yet?{" "}
                  <Button type="link" onClick={() => onSignUp()}>
                    Sign up
                  </Button>
                </span>
              </div>
            </Form.Item> */}
          </Form>
        </Col>
      </Row>
    </div>
  );
};
export default LoginScreen;
