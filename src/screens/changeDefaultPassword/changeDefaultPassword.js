import { Button, Typography } from "antd";
import "./style.scss";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import requireAuth from "../../hocs/requireAuth";

const ChangeDefaultPassword = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="asset-management-page">
      <div className="header">
        <Typography.Title level={4} className="page-title">
            ChangeDefaultPassword
        </Typography.Title>
        </div>
    </div>
  );
};
export default requireAuth(ChangeDefaultPassword);
