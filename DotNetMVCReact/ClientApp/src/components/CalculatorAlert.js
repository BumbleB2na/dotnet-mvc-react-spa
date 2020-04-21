import React, { Component } from 'react';
import { Alert } from 'reactstrap';

export default class CalculatorAlert extends Component {
    constructor(props) {
		super(props);
		this.state = { visible: false };
	}

	timeout = undefined;
	lastMessage;

	selfDismissAfterDelay(delay) {
		this.clearTimeout();
		this.timeout = setTimeout(() => {
			this.setState({ visible: false, message: "" });
			this.clearTimeout();
		}, delay);
	}

	componentDidUpdate() {
		if(!this.timeout || this.state.message !== "" && this.state.message !== this.props.message) {
			this.setState({ visible: true, message: this.props.message });
			this.selfDismissAfterDelay(3000);
		}
	}
	componentWillUnmount() {
		this.clearTimeout();
	}

	clearTimeout() {
		clearTimeout(this.timeout);
		this.timeout = undefined;
	}
	
	render() {
		return (
			<Alert color={this.props.type} isOpen={this.state.visible}>
				{this.props.message}
			</Alert>
		);
	}

}