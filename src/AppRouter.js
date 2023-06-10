import { Layout, Spin } from "antd";
import get from "lodash/get";
import { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import LayoutHeader from "./components/layout/layoutHeader";
import LayoutSider from "./components/layout/layoutSider";
import AuthRouter from "./router/AuthRouter";

const { Content } = Layout;

const AppRouter = () => {
  const isLoggedIn = useSelector((state) => get(state, "auth.isLoggedIn"));
  const [isLoading, setIsLoading] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMenuButton = () => {
    setMobileOpen(!mobileOpen);
  };
  const menuButtonClose = () => {
    setMobileOpen(false);
  };
  return (
    <Spin spinning={isLoading}>
      <div style={{}}>
        <Router>
          <Layout className="main-layout">
            {isLoggedIn && <LayoutSider setIsLoading={setIsLoading} menuButtonClose={menuButtonClose} mobileOpen={mobileOpen} />}

            <Layout>
              {isLoggedIn && <LayoutHeader setIsLoading={setIsLoading} toggleMenuButton={toggleMenuButton} />}
              <Content className="main-content">
                <AuthRouter />
              </Content>
            </Layout>
          </Layout>
        </Router>
      </div>
    </Spin>
  );
};

export default AppRouter;
