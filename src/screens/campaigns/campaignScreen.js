import { Button, Typography } from "antd";
import "./style.scss";
import { PlusOutlined } from "@ant-design/icons";
import CampaignTable from "../../components/campaignManagement/campaignTable";
import { useState } from "react";
import requireAuth from "../../hocs/requireAuth";
import CreateCampaignScreen from "./createCampaignScreen";
import { useSelector } from "react-redux";
import { roles } from "../../constants/roles";
import { Helmet } from "react-helmet";

const CampaignScreen = () => {
  const currentUrl = window.location.href;
  const user = useSelector((state)=>state?.auth?.user);
  return (
    <div className="asset-management-page">
    <Helmet>
      <title>{currentUrl}</title>
    </Helmet>
      <div className="asset-management-table">
        <CampaignTable  />
      </div>
     
    </div>
  );
};
export default requireAuth(CampaignScreen);
