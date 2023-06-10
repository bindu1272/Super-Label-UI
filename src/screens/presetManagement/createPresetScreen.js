import {
    Form,
    Input,
    Button,
    Select,
    Drawer,
    notification,
    Spin
  } from "antd";
  import { useEffect, useState } from "react";
  import "./style.scss";
  import { postPreset,fetchPresetById,updatePreset } from "../../redux/actions/presetActions";
  const { Option } = Select;
  
  const CreatePresetScreen = ({ setOpen, setShowEditPreset, id ,fetchPresets}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({});
    useEffect(() => {
      if (id) {
      setLoading(true);
        fetchPresetById(id).then((result) => {
          setLoading(false);
          form.setFieldsValue(result);
          setInitialValues(result);
        });
      }
    }, [id]);
    const onFinish = (values) => {
      setLoading(true);
      if (id) {
        setLoading(true);
        updatePreset(id, values)
          .then((result) => {
            notification.success({
              message: "Preset updated successfully",
            });
            setLoading(false);
            setShowEditPreset(null);
            fetchPresets();
          })
          .catch((err) => {
            setLoading(false);
          });
      } else {
        postPreset(values)
          .then((result) => {
            setLoading(false);
            setOpen(false);
            notification.success({
              message: "Preset created successfully",
            });
            fetchPresets();
          })
          .catch((error) => {
            setLoading(false);
          });
      }
    };
    return (
      <Drawer
        width={400}
        open={true}
        onClose={() => (id ? setShowEditPreset(null) : setOpen(false))}
        className="create-asset-page"
        title={`${id ? "Update" : "Create"} Preset`}
      >
        {loading ? 
        (
          <div className="items-loader">
          <Spin />
          </div>
        )
        :(
        <Form layout="vertical" className="form" form={form} onFinish={onFinish}>
          <Form.Item
            label="Preset"
            name="preset"
            rules={[
              {
                required: true,
                message: "Preset is required",
              },
            ]}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Width"
            name="width"
          >
            <Input style={{ width: "100%" }} type="number"/>
          </Form.Item>
          <Form.Item
            label="Height"
            name="height"
          >
            <Input style={{ width: "100%" }} type="number"/>
          </Form.Item>
          <Form.Item
            label="Thickness"
            name="thickness"
          >
            <Input style={{ width: "100%" }} type="number"/>
          </Form.Item>
          <Button
            type="primary"
            block
            style={{ marginLeft: "auto" }}
            htmlType="submit"
            loading={loading}
          >
            Submit
          </Button>
        </Form>
        )}
      </Drawer>
    );
  };
  export default CreatePresetScreen;
  