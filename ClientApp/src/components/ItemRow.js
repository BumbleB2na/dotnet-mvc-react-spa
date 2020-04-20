import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { FaTrash } from 'react-icons/fa';
import './ItemRow.css';

export default class ItemRow extends Component {
    constructor(props) {
		super(props);
    }
	
	render() {
		const isCategory = (!this.props.onDeleteItem);
		if(isCategory) {
			return (
				<Row key={this.props.id}>
					<Col xs="9">
						{this.props.name}
					</Col>
					<Col xs="2" className="col-align-right col-padding-right">
						${this.props.value.toFixed(2)}
					</Col>
				</Row>
			);
		} else {
			return (
				<Row key={this.props.id} className="col-padding-left">
					<Col xs="9">
						{this.props.name}
					</Col>
					<Col xs="2" className="col-align-right">
						${this.props.value.toFixed(2)}
					</Col>
					<Col xs="1">
						<FaTrash className="icon-button" onClick={(e) => this.props.onDeleteItem(this.props.id)} />
					</Col>
				</Row>
			);
		}
	}

}