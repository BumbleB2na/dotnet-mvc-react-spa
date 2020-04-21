import React, { Component } from 'react';
import { Container } from 'reactstrap';
import ItemRow from './ItemRow';

export default class ItemTotal extends Component {
    constructor(props) {
		super(props);
    }
	
	render() {
		const totalValue = this.props.items
			.reduce((a, b) => a + b.value, 0);
			
		return (
			<Container fluid={true}>
				<ItemRow id="total" name="TOTAL" value={totalValue} onDeleteItem={false} />
			</Container>
		);
	}

}