import React, { Component } from 'react';
import { Container } from 'reactstrap';
import ItemRow from './ItemRow';

export default class ItemCategories extends Component {
    constructor(props) {
		super(props);
    }
	
	render() {
		const categories = this.props.categories.slice()
			.sort((a, b) => a !== b ? a < b ? -1 : 1 : 0);
		const itemsByCategory = new Array(categories.length);
		categories.forEach((category, index) => {
			const catItems = this.props.items.slice()
				.filter(item => item.category === category)
				.sort((a, b) => a.name !== b.name ? a.name < b.name ? -1 : 1 : 0);
			const totalValue = catItems.reduce((a, b) => a + b.value, 0);
			itemsByCategory[index] = {
				"category": category,
				"totalValue": totalValue,
				"items": catItems
			}
		});

		const contents = itemsByCategory.map(category => {
			return (
				<Container>
					<ItemRow id={category.category} name={category.category} value={category.totalValue} onDeleteItem={false} />
					{category.items.map(item => {
						return (
							<ItemRow id={item.id} name={item.name} value={item.value} onDeleteItem={this.props.onDeleteItem} />
						);
					})}
				</Container>
			);
		});
		return (
			<div>
				{contents}
			</div>
		);
	}

}