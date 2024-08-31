import React from 'react';
import { Button, Input, Form, Card } from 'antd';

type MyFormProps = {
  initCubeSize: {
    length: number;
    width: number;
    height: number;
  };
  updateCubeSize: (length: number, width: number, height: number) => void;
};

type FieldValues = {
  height?: string;
  width?: string;
  length?: string;
};

export const MyForm: React.FC<MyFormProps> = ({ initCubeSize, updateCubeSize }) => {
  const [form] = Form.useForm();

  // Обработка изменения значений
  const handleFieldChange =
    (field: keyof FieldValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10) || 0;
      form.setFieldsValue({ [field]: value });
    };

  // Обработка отправки формы
  const onFinish = () => {
    const { height, width, length } = form.getFieldsValue();
    updateCubeSize(length, width, height);
  };

  return (
    <Card>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={initCubeSize}
        onFinish={onFinish}
        autoComplete="off"
        style={{
          paddingTop: 30,
          paddingBottom: 0,
          paddingLeft: 10,
          paddingRight: 30,
          borderRadius: 20,
        }}>
        <Form.Item
          label="Height"
          name="height"
          rules={[{ required: true, message: 'Please input height!' }]}>
          <Input
            placeholder={initCubeSize.height.toString()}
            onChange={handleFieldChange('height')}
          />
        </Form.Item>
        <Form.Item
          label="Width"
          name="width"
          rules={[{ required: true, message: 'Please input width!' }]}>
          <Input
            placeholder={initCubeSize.width.toString()}
            onChange={handleFieldChange('width')}
          />
        </Form.Item>
        <Form.Item
          label="Length"
          name="length"
          rules={[{ required: true, message: 'Please input length!' }]}>
          <Input
            placeholder={initCubeSize.length.toString()}
            onChange={handleFieldChange('length')}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
