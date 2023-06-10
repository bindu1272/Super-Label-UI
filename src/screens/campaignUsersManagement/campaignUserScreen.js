import { Button, Typography } from "antd";
import "./style.scss";
import { PlusOutlined } from "@ant-design/icons";
import CampaignUserTable from "../../components/campaignUserManagement/campaignUserTable";
import { useState } from "react";
import requireAuth from "../../hocs/requireAuth";
import { useSelector } from "react-redux";
import CreateCampaignUserScreen from "./createCampaignUserScreen";
import { roles } from "../../constants/roles";
import { Helmet } from "react-helmet";

const CampaignUserScreen = () => {
  const currentUrl = window.location.href;
  const user = useSelector((state) => state?.auth?.user);
  
  return (
    <div className="asset-management-page">
       <Helmet>
      <title>{currentUrl}</title>
    </Helmet>
      {user?.["roles"] == roles?.ADMIN?.value && (
        <>
          <div className="asset-management-table">
            <CampaignUserTable />
          </div>
        </>
      )}
    </div>
  );
};
export default requireAuth(CampaignUserScreen);
