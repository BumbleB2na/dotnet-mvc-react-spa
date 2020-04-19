import React, { Component } from 'react';

export default class CategorySelect extends Component {
    constructor(props) {
		super(props);
    }
	
	render() {
		return (
			<select onChange={(e) => this.props.onChange(e)}>
				<option disabled selected required>-- Choose Category --</option>
				{this.props.categories.map(category => {
					return <option value={category}>{category}</option>;
				})}
			</select>
		);
	}

}
