import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { Navigate } from 'react-router';
import { registration } from '../http/userAPI';

const { Option } = Select;
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

function Registration() {
  const [form] = Form.useForm();
  const [registered, setRegistered] = useState();
  const onSubmit = async (values) => {
    const requestBody = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      phone: values.prefix.value + values.phone,
    };

    await registration(requestBody);
    setRegistered(true);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 80 }}>
        <Option value="375">+375</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      {registered && <Navigate to="/login" replace />}
      <Form
        form={form}
        style={{ height: '100%' }}
        {...layout}
        name="registration-form"
        onFinish={onSubmit}
        validateMessages={validateMessages}
        initialValues={{
          prefix: { value: '375' },
        }}
      >
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Form.Item
            label="Fist name"
            name="firstName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Enter first name" />
          </Form.Item>
          <Form.Item
            label="Last name"
            name="lastName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Enter last name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            autocomplete="off"
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
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            autoComplete="off"
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

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
            <Button style={{ width: '100%' }} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
}

export default Registration;
