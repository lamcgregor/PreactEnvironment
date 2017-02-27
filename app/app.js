import {h, render, Component} from 'preact';

import styles from './styles/main.css';

/** @jsx h */

class StarsFrame extends Component {
	constructor(props) {
		super();
		console.log(props.numberOfStars);
	}
	render(props, state) {
		let stars = [];
		for(let i = 0; i < props.numberOfStars; i++) {
			stars.push(
				<span class="glyphicon glyphicon-star"></span>
			)
		}
		return(
			<div id="stars-frame">
				<div class="well">
					{stars}
				</div>
			</div>
		)
	}
}
class ButtonsFrame extends Component {
	constructor(props) {
		super()
	}
	render(props, state) {
		let disabled = props.selectedNumbers.length === 0;
		return(
			<div id="button-frame">
				<button class="btn btn-primary btn-lg" disabled={disabled}>=</button>
			</div>
		)
	}
}
class AnswerFrame extends Component {
	constructor(props) {
		super()
	}
	render(props,state) {
		props.selectedNumbers.sort();
		let selected = props.selectedNumbers.map(function(i) {
			return <div class="number" onClick={props.unClickNumber.bind(null,i)}>{i}</div>
		})
		return(
			<div id="answer-frame">
				<div class="well">
					{selected}
				</div>
			</div>
		)
	}
}
class NumbersFrame extends Component {
	constructor(props) {
		super();
		this.state = props;
	}

	render(props,state) {
		let numbers = [];
		for(let i = 1; i <= 9; i++) {
			let className = "number " + (props.selectedNumbers.indexOf(i) >= 0);
			numbers.push(
				<div class={className} onClick={props.clickNumber.bind(null,i)} >{i}</div>
			)
		}
		return(
			<div id="numbers-frame">
				<div class="well">
					{numbers}
				</div>
			</div>
		)
	}
}

class Game extends Component {
	constructor(props) {
		super();
		this.state = {
			selectedNumbers: [],
			numberOfStars: Math.floor(Math.random() * 9) + 1
		}
	}
	clickNumber(number) {
		if(this.state.selectedNumbers.indexOf(number) < 0) {
			this.setState({
				selectedNumbers: this.state.selectedNumbers.concat(number)
			})
		}
	}
	unClickNumber(number) {
		let numberState = this.state.selectedNumbers,
			index = numberState.indexOf(number);

		numberState.splice(index, 1)

		this.setState({
			selectedNumbers: numberState
		})

	}
	render(props,state) {
		return (
			<div id="game">
				<h1>Play nine!</h1>
				<hr />
				<div class="clearfix">
					<StarsFrame {...state} />
					<ButtonsFrame {...state} />
					<AnswerFrame {...state} unClickNumber={this.unClickNumber.bind(this)}/>
				</div>
				<NumbersFrame {...state} clickNumber={this.clickNumber.bind(this)} />
			</div>
		)
	}
}

render(<Game />, document.getElementById('container'))