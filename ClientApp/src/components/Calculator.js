import React, { Component } from 'react';
import CalculatorAlert from './CalculatorAlert';
import ItemCategories from './ItemCategories';
import ItemTotal from './ItemTotal';
import ItemAdd from './ItemAdd';
import CalculatorService from './../services/CalculatorService';
import ItemService from './../services/ItemService';

export class Calculator extends Component {
    static displayName = Calculator.name;

    constructor(props) {
        super(props);

        this.state = { categories: [], items: [], alert: { }, loading: true };
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
				this.setState({ alert: { type: "warning", message: "There was a problem getting data" }});
				return;
			});
    }
	handleAddItem(newItem) {
		ItemService.addItem(newItem)
			.then(responseItem => {
				let updatedItems = this.state.items.slice();
				updatedItems.push(responseItem);
				this.setState({ items: updatedItems, alert: { type: "success", message: "Calculation updated" }});
			})
			.catch(error => {
				this.setState({ alert: { type: "warning", message: "Item could not be added. Please complete each field then try again." }});
				return;
			});
	}
	handleDeleteItem(itemId) {
		ItemService.deleteItem(itemId)
			.then(() => {
				let updatedItems = this.state.items.filter(item => item.id !== itemId);
				this.setState({ items: updatedItems, alert: { type: "success", message: "Calculation updated" }});
			})
			.catch(error => {
				this.setState({ alert: { type: "warning", message: "There was a problem deleting item" }});
				return;
			});
	}

    static renderContent(categories, items, handleAddItem, handleDeleteItem, alert) {
        return (
            <React.Fragment>
                <h1>Calculator</h1>
				<ItemCategories categories={categories} items={items} onDeleteItem={(itemId) => handleDeleteItem(itemId)} />
				<ItemTotal items={items} />
				<ItemAdd categories={categories} onAddItem={(newItem) => handleAddItem(newItem)} />
				<CalculatorAlert type={alert.type} message={alert.message} />
            </React.Fragment>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Calculator.renderContent(this.state.categories, this.state.items, this.handleAddItem.bind(this), this.handleDeleteItem.bind(this), this.state.alert);

        return (
            <div>
                {contents}
            </div>
        );
    }
}
