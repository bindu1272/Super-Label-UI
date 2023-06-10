import "./style.scss";
import PresetTable from "../../components/presetManagement/presetTable";
import requireAuth from "../../hocs/requireAuth";
import { useSelector } from "react-redux";
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
        <PresetTable/>
      </div>
    </div>
  );
};
export default requireAuth(CampaignScreen);
