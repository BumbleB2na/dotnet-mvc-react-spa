import React, { Component } from 'react';
import ItemCategories from './ItemCategories';
import ItemTotal from './ItemTotal';
import ItemAdd from './ItemAdd';
import ItemRow from './ItemRow';
import CalculatorService from './../services/CalculatorService';
import ItemService from './../services/ItemService';

export class Calculator extends Component {
    static displayName = Calculator.name;

    constructor(props) {
        super(props);
        this.state = { categories: [], items: [], loading: true };
    }

    componentDidMount() {
        this.populateCalculatorData();
	}
	
    populateCalculatorData() {
		CalculatorService.getData()
			.then(data => {
				this.setState({ categories: data.categories, items: data.items, loading: false });
			})
			.catch(error => {
				alert('There was a problem getting data');
				return;
			});
    }
	handleAddItem(newItem) {
		ItemService.addItem(newItem)
			.then(responseItem => {
				let updatedItems = this.state.items.slice();
				updatedItems.push(responseItem);
				this.setState({ items: updatedItems, loading: false });
			})
			.catch(error => {
				alert('There was a problem adding new item');
				return;
			});
	}
	handleDeleteItem(itemId) {
		ItemService.deleteItem(itemId)
			.then(() => {
				let updatedItems = this.state.items.filter(item => item.id !== itemId);
				this.setState({ items: updatedItems, loading: false });
			})
			.catch(error => {
				alert('There was a problem deleting item');
				return;
			});
	}

    static renderContent(categories, items, handleAddItem, handleDeleteItem) {
		categories = categories.slice()
			.sort((a, b) => a !== b ? a < b ? -1 : 1 : 0);
		const itemsByCategory = new Array(categories.length);
		categories.forEach((category, index) => {
			const catItems = items.slice()
				.filter(item => item.category === category)
				.sort((a, b) => a.name !== b.name ? a.name < b.name ? -1 : 1 : 0);
			const totalValue = catItems.reduce((a, b) => a + b.value, 0);
			itemsByCategory[index] = {
				"category": category,
				"totalValue": totalValue,
				"items": catItems
			}
		});
		const overallTotal = items.reduce((a, b) => a + b.value, 0);

        return (
            <React.Fragment>
                <h1>Calculator</h1>
				<ItemCategories categories={categories} items={items} onDeleteItem={(itemId) => handleDeleteItem(itemId)} />
				<ItemTotal items={items} />
				<ItemAdd categories={categories} onAddItem={(newItem) => handleAddItem(newItem)} />
            </React.Fragment>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Calculator.renderContent(this.state.categories, this.state.items, this.handleAddItem.bind(this), this.handleDeleteItem.bind(this));

        return (
            <div>
                {contents}
            </div>
        );
    }
}
