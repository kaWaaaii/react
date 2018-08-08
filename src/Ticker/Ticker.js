import React from 'react'


export default class Ticker extends React.Component{
	state = {
		value: 0,

	}

	

	updateExchangeRate = () => {
		return fetch(`http://coins.demo.javascript.ninja/ticker/${this.props.pair}`)
			.then(r => r.json())
			.then(res => {
				this.setState({
					value: res.last
				})
			})
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.isActive && !this.props.isActive) {
			this.updateExchangeRate();
			this.interval = setInterval(this.updateExchangeRate, 10000)
		} else if (!nextProps.isActive && this.props.isActive) {
			clearInterval(this.interval);
			this.setState({
				value: 0
			})
		}
	}

	componentWillUnmount() {
		
	}

	render() {
		const {pair} = this.props;
		return (
			<div>
				<p>{pair.toUpperCase().replace('_', ' to ')}</p>
				<p>{this.state.value}</p>
			</div>
		)
	}
}
