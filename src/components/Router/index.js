import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

class RouterPage extends Component {
	render() {
		return (
			<Switch>
				{
					this.props.routes.map(item => (
						<Route
							key={item.key}
							path={item.path}
							component={item.component}
							exact={item.exact}
						/>
					))
				}
			</Switch>
		)
	}
}
export default RouterPage