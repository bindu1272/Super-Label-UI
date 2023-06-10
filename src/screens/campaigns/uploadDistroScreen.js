import { Form, Drawer, Button, Input,notification,message } from "antd";
import { useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import {
  postCampaign,
  postUploadDistro,
} from "../../redux/actions/campaignActions";
import { useSelector } from "react-redux";
import get from "lodash/get";

const UploadDistroScreen = ({ setShowUploadDistro, id,fetchCampaigns }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const [packs, setPacks] = useState();
  const [initialValues, setInitialValues] = useState({});
  const user = useSelector((state) => get(state, "auth.user"));

  const onFinish = () => {
    setLoading(true);
    postUploadDistro(id, user?.email, packs, file)
      .then((result) => {
        setLoading(false);
        setShowUploadDistro(null);
        notification.success({
          message: "upload successfully",
        });
        fetchCampaigns();
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const changeHandler = (event) => {
    setPacks(event?.target?.value);
  };

  return (
    <Drawer
      width={400}
      open={true}
      onClose={() =>
        id ? setShowUploadDistro(null) : setShowUploadDistro(false)
      }
      className="create-asset-page"
      title="Upload Distro"
      // title={`${id ? "Update" : "Upload"} Distro`}
    >
      <Form layout="vertical" className="form" form={form} onFinish={onFinish}>
        <div
          borderBottom
          borderColor="gray300"
          className={"d-flex align-items-start align-items-md-center py-12 "}
        >
          <div py="12" className={"w-100"}>
            <>
              <div className={"d-flex align-items-start align-items-md-center"}>
                <div className={"d-flex"}>
                  <label className="position-relative">
                    <input required
                      className="position-absolute top-0 left-0 right-0 bottom-0 h-32 opacity-0 cursor-pointer"
                      type="file"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                      }}
                    />
                  </label>
                </div>
              </div>
            </>
          </div>
        </div>
        <div style={{ marginTop: "24px" }}>
          <Form.Item
            label="Packs"
            name="packs"
            rules={[
              {
                required: true,
                message: "Number of Packs is required",
              },
            ]}
          >
            <Input
              style={{ width: "100%" }}
              placeholder="Enter Number of Packs"
              onChange={changeHandler}
            />
          </Form.Item>
        </div>
        <div style={{ marginTop: "24px" }}>
          <Button   htmlType="submit" type="primary" loading={loading}>Submit</Button>
        </div>
      </Form>
    </Drawer>
  );
};
export default UploadDistroScreen;
