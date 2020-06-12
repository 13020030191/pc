import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Checkbox, Alert, message } from 'antd'
import { Login } from 'ant-design-pro'
import actions from '../../redux/actions'

import styles from './Login.less'

const { UserName, Password, Submit } = Login

@connect(
  ({ userInfo }) => ({ userInfo }),
  dispatch => ({
    setUserInfo: data => dispatch(actions.setUserInfo(data))
  })
)
class LoginPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 'account',
      autoLogin: true,
      notice: '',
      submitting: false,
    }
  }

  //自动登录
  changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    })
  }

  //错误弹框
  renderMessage = (content) => {
    return <Alert
      style={{ marginBottom: 24 }}
      message={content}
      type="error"
      showIcon/>
  }

  //tab切换
  onTabChange = (type) => {
    this.setState({
      type: type,
    })
  }

  //验证码回调
  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err)
        } else {
          console.log(values)
        }
      })
    })

  //登录
  handleSubmit = (err, values) => {
    const { setUserInfo } = this.props
    if (this.state.type === 'account') {
      if (!err &&
        (values.username !== 'yzf' || values.password !== '...')) {
        this.setState({
          notice: '账户或密码错误（yzf/...）！',
        })
      } else if (!err) {
        this.setState({
          submitting: true,
        })
        setTimeout(() => {
          setUserInfo(values.username)
          console.log(values.username, values.password)
        }, 1000)
      }
    } else {
      if (!err) {
        this.setState({
          submitting: true,
        })
        setUserInfo(values.mobile)
        console.log(values.mobile, values.captcha)
      }
    }
  }
  // 注册
  handleRegister = () => {
    message.warning('此功能还没做, 请勿点击!!!')
  }

  render () {
    const { type, autoLogin, notice, submitting } = this.state
    const rulesOption = {
      username: [
        {
          required: true, message: '请输入账号！',
        },
      ],
      password: [
        {
          required: true, message: '请输入密码！',
        },
      ],
      mobile: [
        {
          required: true, message: '请输入手机号！',
        },
        {
          pattern: /^1\d{10}$/,
          message: '手机号格式错误！',
        },
      ],
    }
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={ref => {
            this.loginForm = ref
          }}
        >
          {
            this.state.notice &&
            this.renderMessage(notice)
          }
          <UserName name="username" autoComplete="off" placeholder="yzf"
                    rules={rulesOption.username}/>
          <Password name="password" autoComplete="off" placeholder="..."
                    rules={rulesOption.password}
                    onPressEnter={
                      () => this.loginForm.validateFields(
                        this.handleSubmit)
                    }
          />
        
          <div>
            <Checkbox checked={autoLogin}
                      onChange={this.changeAutoLogin}>自动登录</Checkbox>
            <span className='link-button' onClick={this.handleRegister} style={{ float: 'right' }}>忘记密码</span>
          </div>
          <Submit loading={submitting}>登录</Submit>
          <div className={styles.other}>
            <div className={styles.register} onClick={this.handleRegister}>注册账户</div>
            {/* <Link className={styles.register} to="/user/register">
              注册账户
            </Link> */}
          </div>
        </Login>
      </div>
    )
  }
}

export default LoginPage
