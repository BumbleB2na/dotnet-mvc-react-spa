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
					const isSelected = (this.props.selected !== null && this.props.selected === category);
					if(isSelected)
						return <option value={category} selected>{category}</option>;
					else
						return <option value={category}>{category}</option>;
				})}
			</select>
		);
	}

}
