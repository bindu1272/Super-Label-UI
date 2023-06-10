import { Route, Routes } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import LoginScreen from "../screens/login/loginScreen";
import CampaignScreen from "../screens/campaigns/campaignScreen";
import ReportsScreen from "../screens/reportsManagement/reportsScreen";
import CampaignDashboard from "../screens/campaignDashboard/campaignDashboard";
import CampaignUserScreen from "../screens/campaignUsersManagement/campaignUserScreen";
import ChangeDefaultPassword from "../screens/changeDefaultPassword/changeDefaultPassword";
import PresetManagementScreen from "../screens/presetManagement/presetManagementScreen";

export default function AuthRouter() {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} exact element={<LoginScreen />} />
      {/* <Route path={ROUTES.SIGN_UP} exact element={<SignUpScreen />} /> */}
      <Route
        path={ROUTES.CAMPAIGN_DASHBOARD}
        exact
        element={<CampaignDashboard />}
      />
      {/* <Route path={ROUTES.DASHBOARD} exact element={<DashboardScreen />} /> */}
      <Route
        path={ROUTES.CAMPAIGN_DASHBOARD}
        exact
        element={<CampaignDashboard />}
      />
      <Route
        path={ROUTES.CHANGE_DEFAULT_PASSWORD}
        exact
        element={<ChangeDefaultPassword />}
      />
      <Route path={ROUTES.CAMPAIGN_SCREEN} exact element={<CampaignScreen />} />
      <Route
        path={ROUTES.CAMPAIGN_USERS}
        exact
        element={<CampaignUserScreen />}
      />
      <Route
        path={ROUTES.PRESET_SCREEN}
        exact
        element={<PresetManagementScreen />}
      />
      <Route path={ROUTES.REPORTS_SCREEN} exact element={<ReportsScreen />} />
    </Routes>
  );
}
