import { GeneratedCodeConfig } from "../types";

export default {
  promptList: [
    {
      id: "64671b07-32e1-429c-83c1-0a4a17d0ece0",
      name: "row form",
      des: "This is row form",
      imgUrl: "https://s11.ax1x.com/2023/12/13/pifbBHe.png",
      prompt: `
Refer to the following code format to output the screenshot code.

<html>
<head>
    <meta charset="UTF-8">
    <title>Form Layout</title>
    <style>
    #app {
        background-color: #f0f2f5;
        padding: 24px;
        max-width: 960px;
        margin: 0 auto;
    }
    .ant-row {
        margin-bottom: 24px;
    }
    .ant-col-8 {
        padding-right: 8px;
    }
    .ant-col-16 {
        padding-left: 8px;
    }
    </style>
    <script src="https://registry.npmmirror.com/react/18.2.0/files/umd/react.development.js"></script>
    <script src="https://registry.npmmirror.com/react-dom/18.2.0/files/umd/react-dom.development.js"></script>
    <script src="https://registry.npmmirror.com/@babel/standalone/7.23.6/files/babel.js"></script>
    <script src="https://registry.npmmirror.com/dayjs/1.11.10/files/dayjs.min.js"></script>
    <script src="https://registry.npmmirror.com/antd/5.12.2/files/dist/antd.js"></script>
    <script src="https://registry.npmmirror.com/@ant-design/pro-components/2.6.43/files/dist/pro-components.min.js"></script>
</head>
<body>
<div id="app"></div>

<script type="text/babel">
    const { Input, Form, Card, Col, Row } = antd;
    const { ProForm,  ProFormText, ProFormSelect, ProFormDateRangePicker} = ProComponents;
    function App() {
    return (
        <ProForm>
        <Card title="" bordered={false}>
            <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
                <ProFormText
                label={''}
                name="name"
                placeholder=""
                />
            </Col>
            <Col
                xl={{
                span: 6,
                offset: 2,
                }}
                lg={{
                span: 8,
                }}
                md={{
                span: 12,
                }}
                sm={24}
            >
                <ProFormText
                label={''}
                name="url"
                fieldProps={{
                    style: {
                    width: '100%',
                    },
                    addonBefore: 'http://',
                    addonAfter: '.com',
                }}
                placeholder=""
                />
            </Col>
            <Col
                xl={{
                span: 8,
                offset: 2,
                }}
                lg={{
                span: 10,
                }}
                md={{
                span: 24,
                }}
                sm={24}
            >
                <ProFormSelect
                label={''}
                name="owner"
                options={[
                ]}
                placeholder=""
                />
            </Col>
            </Row>
            <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
                <ProFormSelect
                label={''}
                name="approver"
                options={[
                ]}
                placeholder=""
                />
            </Col>
            <Col
                xl={{
                span: 6,
                offset: 2,
                }}
                lg={{
                span: 8,
                }}
                md={{
                span: 12,
                }}
                sm={24}
            >
                <ProFormDateRangePicker
                label={''}
                name="dateRange"
                fieldProps={{
                    style: {
                    width: '100%',
                    },
                }}
                />
            </Col>
            </Row>
        </Card>
        </ProForm>
    );
    }

    ReactDOM.render(<App />, document.getElementById('app'));
</script>
</body>
</html>
            `,
      type: GeneratedCodeConfig.REACT_ANTD,
    },
    {
      id: "64671b07-32e1-429c-83c1-0a4a17dkkce0",
      name: "table edit",
      des: "table edit",
      imgUrl: "https://s11.ax1x.com/2023/12/14/pihfGPf.png",
      prompt: `
            - Refer to example code format to output the screenshot code.
            - Add logical code for operation columns
            - If there is an edit in the operation, add form logic according to the example code
            - If there is a new operator  in the screenshot operation column, add it to the output code operation column.
            - Must output code according to the example.
            
            <!-- example code  -->
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ant Design Example</title>
                <script src="https://registry.npmmirror.com/react/18.2.0/files/umd/react.development.js"></script>
                <script src="https://registry.npmmirror.com/react-dom/18.2.0/files/umd/react-dom.development.js"></script>
                <script src="https://registry.npmmirror.com/@babel/standalone/7.23.6/files/babel.js"></script>
                <script src="https://registry.npmmirror.com/dayjs/1.11.10/files/dayjs.min.js"></script>
                <script src="https://registry.npmmirror.com/antd/5.12.2/files/dist/antd.js"></script>
                <script src="https://registry.npmmirror.com/@ant-design/pro-components/2.6.43/files/dist/pro-components.min.js"></script>
            </head>
            <body>
            <div id="container"></div>
            
            <script type="text/babel">
            const {  Form, Input, InputNumber, Popconfirm, Table, Typography } = antd;
            const {useState} = React;
            
            const originData = [];
            for (let i = 0; i < 100; i++) {
                originData.push({
                key: i.toString(),
                name: \`Edward\`,
                age: 32,
                address: \`London Park no.\`,
                });
            }
            const EditableCell = ({
                editing,
                dataIndex,
                title,
                inputType,
                record,
                index,
                children,
                ...restProps
            }) => {
                const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
                return (
                <td {...restProps}>
                    {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{
                        margin: 0,
                        }}
                        rules={[
                        {
                            required: true,
                            message: \`Please Input!\`,
                        },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                    ) : (
                    children
                    )}
                </td>
                );
            };
            const App = () => {
                const [form] = Form.useForm();
                const [data, setData] = useState(originData);
                const [editingKey, setEditingKey] = useState('');
                const isEditing = (record) => record.key === editingKey;
                const edit = (record) => {
                form.setFieldsValue({
                    name: '',
                    age: '',
                    address: '',
                    ...record,
                });
                setEditingKey(record.key);
                };
                const cancel = () => {
                setEditingKey('');
                };
                const save = async (key) => {
                try {
                    const row = await form.validateFields();
                    const newData = [...data];
                    const index = newData.findIndex((item) => key === item.key);
                    if (index > -1) {
                    const item = newData[index];
                    newData.splice(index, 1, {
                        ...item,
                        ...row,
                    });
                    setData(newData);
                    setEditingKey('');
                    } else {
                    newData.push(row);
                    setData(newData);
                    setEditingKey('');
                    }
                } catch (errInfo) {
                    console.log('Validate Failed:', errInfo);
                }
                };
                const columns = [
                {
                    title: 'name',
                    dataIndex: 'name',
                    width: '25%',
                    editable: true,
                },
                {
                    title: 'age',
                    dataIndex: 'age',
                    width: '15%',
                    editable: true,
                },
                {
                    title: 'address',
                    dataIndex: 'address',
                    width: '40%',
                    editable: true,
                },
                {
                    title: 'operation',
                    dataIndex: 'operation',
                    render: (_, record) => {
                    const editable = isEditing(record);
                    return editable ? (
                        <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                            marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                        </span>
                    ) : (
                      <Space size="middle">
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                          Edit
                        </Typography.Link>
                        <Typography.Link>
                          Jump
                        </Typography.Link>
                      </Space>
                    );
                    },
                },
                ];
                const mergedColumns = columns.map((col) => {
                if (!col.editable) {
                    return col;
                }
                return {
                    ...col,
                    onCell: (record) => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: isEditing(record),
                    }),
                };
                });
                return (
                <Form form={form} component={false}>
                    <Table
                    components={{
                        body: {
                        cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                    />
                </Form>
                );
            };
            
                ReactDOM.render(<App />, document.getElementById('container'));
            </script>
            </body>
            </html>            
            `,
      type: GeneratedCodeConfig.REACT_ANTD,
    },
    {
      id: "login-1",
      name: "登录页草图",
      des: "手绘登录页草图",
      imgUrl: "https://img.aoau.top/draw/login.png",
      prompt: `
      <html lang="zh">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>登录</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
              body {
                  font-family: 'Noto Sans SC', sans-serif;
              }
          </style>
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100;400;500;700;900&display=swap" rel="stylesheet">
      </head>
      <body class="bg-gray-100 flex items-center justify-center h-screen">
          <div class="bg-white p-8 rounded-lg shadow-lg w-80">
              <h1 class="text-center text-2xl font-semibold mb-6">登录</h1>
              <div class="mb-4">
                  <input type="text" placeholder="邮箱/手机号" class="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500">
              </div>
              <div class="mb-4 flex justify-between">
                  <input type="password" placeholder="密码" class="w-3/4 px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500">
                  <button class="w-1/4 ml-2 text-blue-500 border border-blue-500 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-500 hover:text-white transition-colors">发送</button>
              </div>
              <div class="text-center">
                  <button class="text-blue-500 border border-blue-500 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-500 hover:text-white transition-colors">立即登录</button>
              </div>
          </div>
      </body>
      </html>
              `,
      type: GeneratedCodeConfig.HTML_TAILWIND,
    },
    {
      id: "login-2",
      name: "登录页草图",
      des: "手绘登录页草图",
      imgUrl: "https://img.aoau.top/draw/login.png",
      prompt: `
      <html>
      <head>
        <meta charset="UTF-8">
        <title>App Interface</title>
        <script src="https://registry.npmmirror.com/react/18.2.0/files/umd/react.development.js"></script>
        <script src="https://registry.npmmirror.com/react-dom/18.2.0/files/umd/react-dom.development.js"></script>
        <script src="https://registry.npmmirror.com/@babel/standalone/7.23.6/files/babel.js"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body {
            font-family: 'PingFang SC', sans-serif;
          }
        </style>
      </head>
      <body>
        <div id="app"></div>
      
        <script type="text/babel">
          function App() {
            return (
              <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex flex-col items-center">
                    <h1 className="text-lg mb-4">登录</h1>
                    <input
                      type="text"
                      placeholder="邮箱/手机号"
                      className="mb-4 px-4 py-2 border rounded w-full"
                    />
                    <div className="flex w-full mb-4">
                      <input
                        type="text"
                        placeholder="验证码"
                        className="px-4 py-2 border rounded w-2/3 mr-2"
                      />
                      <button className="w-1/3 bg-blue-500 text-white rounded px-4 py-2">
                        发送
                      </button>
                    </div>
                    <button className="mb-4 px-4 py-2 border rounded w-full bg-blue-500 text-white">
                      登录
                    </button>
                    <button className="px-4 py-2 border rounded w-full text-blue-500">
                      忘记密码
                    </button>
                  </div>
                </div>
              </div>
            );
          }
      
          ReactDOM.render(<App />, document.getElementById('app'));
        </script>
      </body>
      </html>
                `,
      type: GeneratedCodeConfig.REACT_TAILWIND,
    },
    {
      id: "login-3",
      name: "登录页草图",
      des: "手绘登录页草图",
      imgUrl: "https://img.aoau.top/draw/login.png",
      prompt: `
      <html>
      <head>
          <title>App Interface</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
          <style>
              body {
                  background-color: #f8f9fa;
                  padding-top: 50px;
                  display: flex;
                  justify-content: center;
              }
              .card {
                  border-radius: 20px;
                  width: 300px;
                  padding: 20px;
                  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
              }
              .form-control {
                  border-radius: 20px;
                  border: 2px solid #000;
                  margin-bottom: 20px;
              }
              .btn-outline-primary {
                  border-radius: 20px;
                  border: 2px solid #000;
                  color: #000;
                  background-color: transparent;
              }
              .btn-primary {
                  border-radius: 20px;
                  border: 2px solid #007bff;
                  background-color: #007bff;
                  color: #fff;
                  margin-bottom: 20px;
              }
              .btn-block {
                  width: 100%;
              }
              .text-center {
                  margin-bottom: 20px;
              }
          </style>
      </head>
      <body>
          <div class="card">
              <div class="text-center">
                  登录
              </div>
              <input type="text" class="form-control" placeholder="邮箱/手机号">
              <input type="password" class="form-control" placeholder="密码">
              <button type="button" class="btn btn-primary btn-block">登录</button>
              <button type="button" class="btn btn-outline-primary btn-block">立即登录</button>
          </div>
      </body>
      </html>
                `,
      type: GeneratedCodeConfig.BOOTSTRAP,
    },
  ],
};
