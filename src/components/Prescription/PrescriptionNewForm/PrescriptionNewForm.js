// import { Col, Row, Form, Input, Select, Button } from "antd";
// import React from "react";
// import { drugs } from "../../../static/drug";

// const PrescriptionNewForm = () => {
//   const onFinish = (values) => {
//     console.log("Success:", values);
//   };
//   return (
//     <Row>
//       <Col xs={24}>
//         <Form onFinish={onFinish}>
//           <Row gutter={30}>
//             <Col xs={6}>
//               <Form.Item label="Tên thuốc">
//                 <Select
//                   showSearch
//                   style={{
//                     width: 200,
//                   }}
//                   placeholder="Search to Select"
//                   optionFilterProp="children"
//                   filterOption={(input, option) =>
//                     (option?.label ?? "").includes(input)
//                   }
//                   filterSort={(optionA, optionB) =>
//                     (optionA?.label ?? "")
//                       .toLowerCase()
//                       .localeCompare((optionB?.label ?? "").toLowerCase())
//                   }
//                   options={drugs}
//                 />
//               </Form.Item>
//             </Col>
//             <Col xs={6}>
//               <Form.Item label="Số lượng">
//                 <Input type="number"></Input>
//               </Form.Item>
//             </Col>
//             <Col xs={6}>
//               <Form.Item label="Cách dùng">
//                 <Input></Input>
//               </Form.Item>
//             </Col>
//             <Col xs={6}>
//               <Form.Item label="Tên thuốc">
//                 <Input type="number"></Input>
//               </Form.Item>
//             </Col>
//           </Row>
//         </Form>
//       </Col>
//       <Col xs={24}>
//         <Button type="primary" htmlType="submit">Tạo toa thuốc</Button>
//       </Col>
//     </Row>
//   );
// };

// export default PrescriptionNewForm;

import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Select } from "antd";
import { drugs } from "../../../static/drug";

const PrescriptionNewForm = () => {
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };
  return (
    <Form
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      autoComplete="off"
      size="large"
    >
      <Form.List name="presciption">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  display: "flex",
                  marginBottom: 8,
                }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "drugName"]}
                  rules={[
                    {
                      required: true,
                      message: "Thiếu tên thuốc",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    style={{
                      width: 200,
                    }}
                    placeholder="Nhập tên thuốc"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={drugs}
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "drugQuantity"]}
                  rules={[
                    {
                      required: true,
                      message: "Xin mời nhập số lượng",
                    },
                  ]}
                >
                  <Input placeholder="Nhập số lượng" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "drugUsage"]}
                  rules={[
                    {
                      required: true,
                      message: "Xin mời nhập cách dùng",
                    },
                  ]}
                >
                  <Input placeholder="Nhập cách dùng" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
                className="w-25 me-4"
              >
                Thêm thuốc
              </Button>
              <Button type="primary" htmlType="submit">
                Tạo toa thuốc
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default PrescriptionNewForm;
