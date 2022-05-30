import React from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../http/userAPI';
import { setUserInfo } from '../store/user';
import { KITCHEN } from '../util/consts';

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
};

const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 20,
  },
};

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onSubmit = async (values) => {
    const requestBody = {
      email: values.email,
      password: values.password,
    };
    const loginResp = await login(requestBody);
    const { role, firstName, lastName, email, phone } = loginResp;
    dispatch(setUserInfo({ isAdmin: role === 'admin', firstName, lastName, email, phone, authenticated: true }));
    navigate(KITCHEN, { replace: true });
  };

  return (
    <div>
      <Form
        form={form}
        style={{ height: '100%' }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...layout}
        name="login-form"
        onFinish={onSubmit}
        validateMessages={validateMessages}
      >
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                required: true,
              },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
            <Button style={{ width: '100%' }} type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default Login;
