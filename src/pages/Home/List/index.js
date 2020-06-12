import React, { Component } from 'react'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import Router from '@/components/Router'
import { getRouterData } from '@/router/router'
import { getRoutes, getDataSource, addDataSource, delData, editData } from '@/utils/utils'
import {
  Input,
  Card,
  Form,
  Row,
  Col,
  Button,
  Table,
  Modal,
  Popconfirm,
  Divider,
  message
} from 'antd';

const styles = {
  formItem: {
    marginBottom: 0
  },
  reset: {
    marginRight: 10
  },
  tableButton: {
    textAlign: 'right',
    marginBottom: 16
  },
  columnsOpt: {
    color: '#1890ff',
    cursor: 'pointer'
  }
}


class List extends Component {
  state = {
    spare: [],
    dataSource: [],
    record: {},
    columns: [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '操作',
        dataIndex: '',
        key: 'opt',
        render: (record) => {
          return (
            <span>
              <span style={styles.columnsOpt} onClick={() => {
                console.log(record)
                this.setState({
                  editVisible: true,
                  record
                })
              }}>编辑</span>
              <Divider type="vertical" />
              <Popconfirm
                title="确定要删除吗？"
                okText="是的"
                cancelText="取消"
                onConfirm={() => {
                  delData('dataSource', record.key)
                  setTimeout(() => {
                    this.setState({
                      dataSource: getDataSource('dataSource'),
                      spare: getDataSource('dataSource'),
                    })
                  }, 100)
                }}
              >
                <span style={styles.columnsOpt} >删除</span>
              </Popconfirm>
            </span>
          )
        }
      }
    ],
    visible: false,
    loading: false,
    editVisible: false
  }
  componentDidMount() {
    this.setState({
      dataSource: getDataSource('dataSource'),
      spare: getDataSource('dataSource'),
    })
  }
  handleDel = (text, record) => {
    // console.log(text, record)
  }
  handleAdd = () => {
    this.setState({
      visible: true
    })
  }
  handleOk = e => {
    const { form } = this.props;
    form.validateFields((err, val) => {
      if (!err) {
        let obj = {
          name: val.formName,
          age: val.formAge,
          address: val.formAddress
        }
        if (val.formName !== undefined && val.formAge !== undefined && val.formAddress !== undefined) {
          addDataSource('dataSource', obj)
          this.setState({
            visible: false,
            loading: true,
          }, () => {
            form.resetFields();
            this.setState({
              dataSource: getDataSource('dataSource'),
              spare: getDataSource('dataSource'),
              loading: false
            })
          })
        } else {
          message.error('请输入正常数据');
        }
      }
    })
  }

  handleEditTable = (record) => {
    console.log(record)
    const { form } = this.props;
    form.validateFields((err, val) => {
      if (!err) {
        let obj = {
          name: val.formName,
          age: val.formAge,
          address: val.formAddress,
          key: this.state.record.key
        }
        if (val.formName !== undefined && val.formAge !== undefined && val.formAddress !== undefined) {
          console.log(obj);
          editData('dataSource', obj)
          this.setState({
            editVisible: false,
            loading: true,
          }, () => {
            form.resetFields();
            this.setState({
              dataSource: getDataSource('dataSource'),
              spare: getDataSource('dataSource'),
              loading: false
            })
          })
        } else {
          message.error('请输入正常数据');
        }
      }
    })
  }

  handleCancel = e => {
    this.setState({
      visible: false,
      editVisible: false
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;
    const { dataSource } = this.state;
    form.validateFields((err, val) => {
      if (!err) {
        dataSource.map((v) => {
          if (val.name === v.name) {
            this.setState({
              dataSource: [v]
            })
          } else if (val.age === v.age) {
            this.setState({
              dataSource: [v]
            })
          } else if (val.address === v.address) {
            this.setState({
              dataSource: [v]
            })
          }
          return null
        })
      }
    })
  }
  handleReset = () => {
    this.props.form.resetFields();
    this.setState({
      dataSource: this.state.spare
    })
  }
  renderFormFields = () => {
    const { form } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    const formArray = [];
    const labelArray = ['姓名', '年龄', '住址']
    for (let i = 0; i < 3; i++) {
      formArray.push(
        <Col span={6} key={i}>
            <Form.Item
              {...formItemLayout}
              label={`${labelArray[i]}`}
              style={styles.formItem}
            >
              {form.getFieldDecorator(`${this.state.columns[i].dataIndex}`)(
                <Input placeholder="placeholder" />
              )}
            </Form.Item>
          </Col>
      )
    }
    return formArray
  }
  renderSearchForm = () => {
    return (
      <Form
        onSubmit={this.handleSubmit}
      >
        <Row gutter={24}>
          {this.renderFormFields()}
          <Col span={6}>
            <Form.Item style={styles.formItem}>
              <Button onClick={this.handleReset} style={styles.reset}>重置</Button>
              <Button htmlType="submit" type="primary">查询</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
  }
  renderCreateFrom = () => {
    const { form } = this.props;
    const { record, editVisible } = this.state;
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 20 },
    };
    return (
      <Form>
        <Row gutter={24}>
        <Col span={24} key={1}>
            <Form.Item
              {...formItemLayout}
              label={'姓名'}
              style={styles.formItem}
            >
              {form.getFieldDecorator('formName', {
                initialValue: editVisible ? record.name : null
              })(
                <Input placeholder="placeholder" />
              )}
            </Form.Item>
          </Col>
          <Col span={24} key={2}>
            <Form.Item
              {...formItemLayout}
              label={'年龄'}
              style={styles.formItem}
            >
              {form.getFieldDecorator('formAge', {
                initialValue: editVisible ? record.age : null
              })(
                <Input placeholder="placeholder" />
              )}
            </Form.Item>
          </Col>
          <Col span={24} key={3}>
            <Form.Item
              {...formItemLayout}
              label={'住址'}
              style={styles.formItem}
            >
              {form.getFieldDecorator('formAddress', {
                initialValue: editVisible ? record.address : null
              })(
                <Input placeholder="placeholder" />
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
  }
  render () {
    const { location, match } = this.props
    const routerData = getRouterData()
    const routes = getRoutes(match.path, routerData)
    const { columns, dataSource } = this.state;
    return (
      <PageHeaderWrapper
        tabActiveKey={location.pathname.replace(`${match.path}/`, '')}
      >
        <Card bordered={false} size="small">
          {this.renderSearchForm()}
        </Card>
        <Card bordered={false} style={{ marginTop: 16 }} size="small">
          <div style={styles.tableButton}>
            <Button onClick={this.handleAdd} type="primary">新建</Button>
          </div>
          <Table 
            dataSource={dataSource}
            columns={columns}
          />
        </Card>
        <Modal
          title="新建一条数据"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {this.renderCreateFrom()}
        </Modal>
        <Modal
          title="编辑一条数据"
          visible={this.state.editVisible}
          onOk={this.handleEditTable}
          onCancel={this.handleCancel}
        >
          {this.renderCreateFrom()}
        </Modal>
        <Router routes={routes}></Router>
      </PageHeaderWrapper>
    )
  }
}

export default Form.create({})(List)
