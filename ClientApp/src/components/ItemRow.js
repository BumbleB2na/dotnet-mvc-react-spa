import React, { Component } from 'react';
import { FaTrash } from 'react-icons/fa';
import './ItemRow.css';

export default class ItemRow extends Component {
    constructor(props) {
		super(props);
    }
	
	render() {
		return (
			<li key={this.props.id}>{this.props.name} - ${this.props.value.toFixed(2)} <FaTrash className="icon-button" onClick={(e) => this.props.onDeleteItem(this.props.id)} /></li>
		);
	}

}