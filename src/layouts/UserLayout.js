import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import { getRoutes } from '../utils/utils'
import styles from './UserLayout.less'


class UserLayout extends Component {
  //获取页面标题
  getPageTitle = () => {
    let { routerData, location } = this.props
    let { pathname } = location
    let title = 'yzf'
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - ${title}`
    }
    return title
  }

  render () {
    let { match, routerData } = this.props
    let routes = getRoutes(match.path, routerData)
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.content}>
            <Switch>
              {
                routes.map(item => {
                  return <Route
                    key={item.key}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                  />
                })
              }
              <Redirect exact from="/user" to="/user/login"/>
            </Switch>
          </div>
          {/* <GlobalFooter links={links} copyright={copyright}/> */}
        </div>
      </DocumentTitle>
    )
  }
}

export default UserLayout
