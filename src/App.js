import AppRouter from "./AppRouter";
import perisistStore from "./redux/store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ConfigProvider } from "antd";
import "./styles/App.scss";

// Styles
// import './styles/css/antd.css';
// import './styles/App.scss';

const { store, persistor } = perisistStore;
function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#4321BF",
          colorLink: "#4321BF",
          colorLinkHover: "#a895ed",
        },
      }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="app-container">
            <AppRouter />
          </div>
        </PersistGate>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
