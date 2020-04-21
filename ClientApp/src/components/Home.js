import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Home extends Component {
	static displayName = Home.name;

	render() {
		return (
			<div>
				<h1>Tools</h1>
				<ul>
					<li><Link tag={Link} to="/calculator">Calculator</Link> -- Calculate the total of your high-value items</li>
				</ul>
			</div>
		);
	}
}
