import React, { Component } from 'react';
import CategorySelect from './CategorySelect';

export default class ItemAdd extends Component {
    constructor(props) {
		super(props);
        this.state = { name: null, value: null, category: null, processing: false };
	}

	handleItemNameInput(e) {
		this.setState({ "name":e.currentTarget.value });
	}
	handleValueInput(e) {
		this.setState({ "value":e.currentTarget.value })
	}
	handleCategorySelected(e) {
		this.setState({ "category":e.currentTarget.value });
	}
	handleAddItemClick = (parentHandler) => {
		const isValid = (this.state.name !== null
			&& this.state.value !== null
			&& this.state.category !== null);
		if(!isValid) {
			alert('You must enter an item name, a monetary value and choose a category. Please enter in all details for a new item then try again');
			return;
		}

		const newItem = {
			"name": this.state.name,
			"value": parseFloat(this.state.value),
			"category": this.state.category
		};
		this.props.onAddItem(newItem);
		
		// reset state
        this.setState({ name: null, value: null, category: null, processing: true });
	}
	
	render() {
		return (
			<div>
				<input type="text" placeholder="Item Name" required onChange={(e) => this.handleItemNameInput(e)}></input>
				<input type="number" data-type="currency" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" step="1.00" placeholder="$0.00" required onChange={(e) => this.handleValueInput(e)}></input>
				<CategorySelect categories={this.props.categories} onChange={(e) => this.handleCategorySelected(e)} />
				<button onClick={() => this.handleAddItemClick()}>Add</button>
			</div>
		);
	}

}
