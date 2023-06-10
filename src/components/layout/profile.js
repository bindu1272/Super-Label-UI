import { Drawer, Form, Input, Button, Space, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile,updateProfile } from "../../redux/actions/authActions";
import { getUser } from "../../redux/selectors/authSelectors";
import * as TYPES from "../../constants/actionTypes";
import get from "lodash/get";

const { Option } = Select;


const Profile = ({ showProfile, setShowProfile }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState();
  const user = useSelector((state) =>{
    return state?.auth?.user;
  });

  const userRoles = {
    1: { name: "ADMIN" },
    2: { name: "MEMBER" },
    3: { name: "DRIVER" },
  };
  const onFinish = (values) => {
    setLoading(true);
    updateProfile(user?.id, values)
        .then((result) => {
          setLoading(false);
          // setOpen(false);
          dispatch({
            type: TYPES.UPDATE_USER_PROFILE,
            data: result,
          });
          setShowProfile(false);
          notification.success({
            message: "Profile updated successfully",
          });
        })
        .catch((err) => {
          setLoading(false);
        });

    // dispatch(
    //   updateUserProfile(
    //     data,
    //     user?.email,
    //     () => {
    //       setLoading(false);
    //       setShowProfile(false);
    //       notification.success({
    //         message: "Profile Updated Successfully",
    //       });
    //     },
    //     () => {
    //       setLoading(false);
    //     }
    //   )
    // );
  };
  const onClose = () => {
    setShowProfile(false);
  };
  const [form] = Form.useForm();
  useEffect(() => {
    console.log(user);
    const userDetails = { ...user, roles: userRoles?.[user?.roles]?.name };
    form.setFieldsValue(userDetails);
  }, [user]);
  const changeRoleHandler = (role) => {
    setSelectedRole(role?.value);
  };
  console.log(selectedRole, user);

  return (
      <Drawer
        title="Update Profile"
        placement="right"
        closable={false}
        onClose={onClose}
        open={showProfile}
        width={400}
      >
          <Form onFinish={onFinish} layout="vertical" form={form}>
            <Form.Item
              name="first_name"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "Please input your first name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="last_name"
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: "Please input your last name!",
                },
              ]}
            >
              <Input/>
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Role"
              name="roles"
              rules={[
                {
                  required: true,
                  message: "Role is required",
                },
              ]}
            >
              <Select
                placeholder="Select Role"
                disabled={true}
                labelInValue
                style={{
                  width: "100%",
                }}
                onChange={changeRoleHandler}
              >
                <Option key="ADMIN" value="ADMIN">
                  ADMIN
                </Option>
                <Option key="MEMBER" value="MEMBER">
                  MEMBER
                </Option>
                <Option key="DRIVER" value="DRIVER">
                  DRIVER
                </Option>
              </Select>
            </Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Update
            </Button>
            <Button onClick={onClose} block style={{ marginTop: "10px" }}>
              Cancel
            </Button>
          </Form>
      </Drawer>
  );
};
export default Profile;
