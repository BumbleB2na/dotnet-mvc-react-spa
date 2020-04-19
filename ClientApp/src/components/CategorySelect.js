import React, { Component } from 'react';

export default class CategorySelect extends Component {
    constructor(props) {
		super(props);
		// this.props.categories = props.categories;
    }
	
	render() {
		return (
			<select>
				<option disabled selected>-- Choose Category --</option>
				{this.props.categories.map(category =>
					<option value={category}>{category}</option>
				)}
			</select>
		);
	}

}
