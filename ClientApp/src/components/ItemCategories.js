import React, { Component } from 'react';
import { Container } from 'reactstrap';
import ItemRow from './ItemRow';

export default class ItemCategories extends Component {
    constructor(props) {
		super(props);
	}
	
	render() {
		const categoriesOfItems = this.getCategoriesOfItems();
		const contents = categoriesOfItems.map(category => {
			return (
				<Container>
					<ItemRow id={category.name} name={category.name} value={category.totalValue} onDeleteItem={false} />
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

	getCategoriesOfItems() {
		const categories = this.props.categories.slice()
			.sort(this.sortAlphabetically);
		const categoriesOfItems = new Array(categories.length);
		categories.forEach((category, index) => {
			const catItems = this.props.items.slice()
				.filter(item => item.category === category)
				.sort(this.sortAlphabeticallyByName);
			const totalValue = catItems.reduce((a, b) => a + b.value, 0);
			categoriesOfItems[index] = {
				"name": category,
				"totalValue": totalValue,
				"items": catItems
			}
		});
		return categoriesOfItems;
	}
	sortAlphabetically(a, b) {
		return a !== b ? a < b ? -1 : 1 : 0;
	}
	sortAlphabeticallyByName(a, b) {
		return a.name || a !== b.name || b ? a.name || a < b.name || b ? -1 : 1 : 0;
	}

}