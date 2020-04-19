import React, { Component } from 'react';
import ItemAdd from './ItemAdd';

export class Calculator extends Component {
    static displayName = Calculator.name;

    constructor(props) {
        super(props);
        this.state = { categories: [], items: [], loading: true };
    }

    componentDidMount() {
        this.populateCalculatorData();
	}
	
	handleAddItem(newItem) {
		alert('Add new item: ' + JSON.stringify(newItem));
	}

    static renderContent(categories, items, handleAddItem) {
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
                <h4>Items</h4>
                <ul>
					{itemsByCategory.map(category => {
						const itemRows = category.items.map(item =>
							<li key={item.id}>{item.name} - ${item.value.toFixed(2)}</li>
						);
						return (
							<React.Fragment>
								<li key={category}><b>{category.category} - ${category.totalValue.toFixed(2)}</b>
								<uL>
									{itemRows}
								</uL></li>
							</React.Fragment>
						);
					})}
                </ul>
				<div>
					<b>TOTAL: </b>${overallTotal.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
				</div>
				<ItemAdd categories={categories} onAddItem={(newItem) => handleAddItem(newItem)} />
            </React.Fragment>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Calculator.renderContent(this.state.categories, this.state.items, this.handleAddItem);

        return (
            <div>
                {contents}
            </div>
        );
    }

    async populateCalculatorData() {
        const response = await fetch('api/calculator');
        const data = await response.json();
        this.setState({ categories: data.categories, items: data.items, loading: false });
    }
}
