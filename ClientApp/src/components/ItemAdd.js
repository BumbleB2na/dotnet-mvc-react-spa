import React, { Component } from 'react';
import { Container, Row, Col, InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
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
	async handleAddItemClick() {
		const isValid = (this.state.name !== null
			&& this.state.value !== null
			&& this.state.category !== null);
		if(!isValid) {
			await this.props.onAddItem();
			return;
		}

        this.setState({ processing: true });
		const newItem = {
			"name": this.state.name,
			"value": parseFloat(this.state.value),
			"category": this.state.category
		};
		await this.props.onAddItem(newItem);
		
		// reset state
        this.setState({ name: null, value: null, category: null, processing: false });
	}
	
	render() {
		if(this.state.processing)
			return null;
		return (
			<Container style={{paddingTop: 20, paddingBottom: 20}} fluid={true}>
				<Row>
					<h2>Add Item</h2>
				</Row>
				<Row>
					<Col>
						<InputGroup>
							<Input placeholder="Item Name" type="text" required onChange={(e) => this.handleItemNameInput(e)} />
						</InputGroup>
					</Col>
					<Col>
						<InputGroup>
							<InputGroupAddon addonType="prepend">$</InputGroupAddon>
							<Input placeholder="0" min={0} max={99999999} type="number" step="1" required onChange={(e) => this.handleValueInput(e)} />
							<InputGroupAddon addonType="append">.00</InputGroupAddon>
						</InputGroup>
					</Col>
					<Col>
						<CategorySelect categories={this.props.categories} onChange={(e) => this.handleCategorySelected(e)} />
					</Col>
					<Col>
						<Button color="primary" block onClick={() => this.handleAddItemClick()} disabled={this.state.processing}>Add</Button>
					</Col>
				</Row>
			</Container>
		);
	}

}
