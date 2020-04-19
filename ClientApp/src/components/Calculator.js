import React, { Component } from 'react';
import ItemAdd from './ItemAdd';
import ItemRow from './ItemRow';

export class Calculator extends Component {
    static displayName = Calculator.name;

    constructor(props) {
        super(props);
        this.state = { categories: [], items: [], loading: true };
    }

    componentDidMount() {
        this.populateCalculatorData();
	}
	
    async populateCalculatorData() {
        let data;
        try {
			const response = await fetch('api/calculator');
            data = await response.json();
        }
        catch (error) {
            alert('There was a problem getting data');
            return;
        }
        this.setState({ categories: data.categories, items: data.items, loading: false });
    }
	async handleAddItem(newItem) {
        let data;
        try {
			const response = await fetch('api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newItem)
            });
			data = await response.json();
			if(data.status && data.status !== 200)
				if(data.title)
					throw new Error(data.title);
				else
					throw new Error();
        }
        catch (error) {
            alert('There was a problem adding new item');
            return;
		}
		let updatedItems = this.state.items.slice();
		updatedItems.push(data);
        this.setState({ items: updatedItems, loading: false });
	}
	async handleDeleteItem(itemId) {
        let data;
        try {
			const response = await fetch('api/items/'+itemId, {
                method: 'DELETE'
            });
			data = await response.json();
			if(data.status && data.status !== 200)
				if(data.title)
					throw new Error(data.title);
				else
					throw new Error();
        }
        catch (error) {
            alert('There was a problem deleting item');
            return;
		}
		let updatedItems = this.state.items.filter(item => item.id !== itemId);
        this.setState({ items: updatedItems, loading: false });
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
                <h4>Items</h4>
                <ul>
					{itemsByCategory.map(category => {
						const itemRows = category.items.map(item =>
							<ItemRow id={item.id} name={item.name} value={item.value} onDeleteItem={(itemId) => handleDeleteItem(itemId)} />
						);
						return (
							<React.Fragment>
								<li key={category}><b>{category.category} - ${category.totalValue.toFixed(2)}</b>
								<ul>
									{itemRows}
								</ul></li>
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
            : Calculator.renderContent(this.state.categories, this.state.items, this.handleAddItem.bind(this), this.handleDeleteItem.bind(this));

        return (
            <div>
                {contents}
            </div>
        );
    }
}
