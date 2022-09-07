import { Button, Form, Input, InputNumber, Upload } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { PlusCircleOutlined, UploadOutlined } from '@ant-design/icons';

const Wrapper = styled.div`
  position: relative;
  width: 30%;
  box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.3);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  height: 500px;
  margin-bottom: 50px;
  padding: 20px;
  margin: 0 10px 50px 10px;

  .ant-picker,
  .ant-input-number-group-wrapper {
    width: 100%;
  }
`;

const AddNewDishButton = styled.button`
  width: 50%;
  height: 30%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 60px;
  border: none;
  background: none;
  cursor: pointer;

  :hover {
    color: #b2b2b2;
  }
`;

function NewDishForm({ newDishForm, isFormActive, onAddNewDish, onFinish }) {
  const [fileList, setFileList] = useState([]);

  return (
    <Wrapper>
      {isFormActive && (
        <Form layout="vertical" form={newDishForm} onFinish={onFinish}>
          <Form.Item name="image">
            <Upload
              action={() => true}
              accept="image/*"
              fileList={fileList}
              beforeUpload={(file) => {
                setFileList([file]);
                return false;
              }}
              onRemove={() => setFileList([])}
            >
              {fileList.length === 1 ? null : <Button icon={<UploadOutlined />}>Upload image</Button>}
            </Upload>
          </Form.Item>
          <Form.Item
            label="Product"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input product name!',
              },
            ]}
          >
            <Input placeholder="Please enter the dish name" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input product description!',
              },
            ]}
          >
            <Input placeholder="Please enter the description" />
          </Form.Item>
          <Form.Item
            label="Time for preparing"
            name="time"
            rules={[
              {
                required: true,
                message: 'Please input product cooking time!',
              },
            ]}
          >
            <InputNumber step={1} min={1} addonAfter="minutes" />
          </Form.Item>
          <Form.Item
            label="Price for portion"
            name="price"
            rules={[
              {
                required: true,
                message: 'Please input product price!',
              },
            ]}
          >
            <InputNumber step={1} min={1} addonAfter="$" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}{' '}
      {!isFormActive && (
        <AddNewDishButton
          onClick={() => {
            onAddNewDish();
          }}
        >
          <PlusCircleOutlined />
        </AddNewDishButton>
      )}
    </Wrapper>
  );
}

export default NewDishForm;
