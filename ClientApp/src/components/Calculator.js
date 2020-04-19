import React, { Component } from 'react';

export class Calculator extends Component {
    static displayName = Calculator.name;

    constructor(props) {
        super(props);
        this.state = { categories: [], loading: true };
    }

    componentDidMount() {
        this.populateCalculatorData();
    }

    static renderCategories(categories) {
        return (
            <ul>
                {categories.map(category =>
                    <li key={category}>{category}</li>
                )}
            </ul>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Calculator.renderCategories(this.state.categories);

        return (
            <div>
                <h4>Categories</h4>
                {contents}
            </div>
        );
    }

    async populateCalculatorData() {
        const response = await fetch('api/calculator');
        const data = await response.json();
        this.setState({ categories: data.categories, loading: false });
    }
}
