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
		this.state = props;
	}

	render(props, state) {
		let disabled = props.selectedNumbers.length === 0,
			correct = props.correct,
			button;

		switch(correct) {
			case true:
				button = (
					<button class="btn btn-success btn-lg" onClick={props.acceptAnswer}>
						<span class="glyphicon glyphicon-ok"></span>
					</button>
				)
			break;
			case false:
				button = (
					<button class="btn btn-danger btn-lg" disabled={disabled}>
						<span class="glyphicon glyphicon-remove"></span>
					</button>
				)
			break;
			default:
				button = (
					<button class="btn btn-primary btn-lg" disabled={disabled} onClick={props.checkAnswer}>=</button>
				)
			break;
		}
		return(
			<div id="button-frame">
				{button}
				<br />
				<br />
				<button class="btn btn-warning btn-xs" onClick={props.reDraw} disabled={props.reDraws === 0}>
					<span class="glyphicon glyphicon-refresh"></span>&nbsp;{props.reDraws}
				</button>
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
			let className = "number selected-" + (props.selectedNumbers.indexOf(i) >= 0) + " used-" + (props.usedNumbers.indexOf(i) >= 0);
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
class DoneFrame extends Component {
	constructor() {
		super();
	}
	render(props,state) {
		return(
			<div class="well text-center">
				<h2>{props.doneStatus}</h2>
				<button class="btn btn-default" onClick={props.resetGame}>Play again?</button>
			</div>
		)
	}
}

class Game extends Component {
	constructor(props) {
		super();
		this.state = {
			selectedNumbers: [],
			numberOfStars: this.randomNumber(),
			correct: null,
			reDraws: 5,
			usedNumbers: [],
			doneStatus: 'Just a test'
		}
		this.baseState = this.state;
	}
	resetGame() {
		console.log(this.baseState);
		this.setState(this.baseState)
	}
	randomNumber() {
		return Math.floor(Math.random() * 9) + 1
	}
	clickNumber(number) {
		if(this.state.selectedNumbers.indexOf(number) < 0) {
			this.setState({
				selectedNumbers: this.state.selectedNumbers.concat(number),
				correct: null
			})
		}
	}
	unClickNumber(number) {
		let numberState = this.state.selectedNumbers,
			index = numberState.indexOf(number);

		numberState.splice(index, 1)

		this.setState({
			selectedNumbers: numberState,
			correct: null
		})

	}
	totalSelected() {
		return this.state.selectedNumbers.reduce(function(p,n){
			return p+n;
		},0)
	}
	checkAnswer() {
		let correct = this.state.numberOfStars === this.totalSelected();
		this.setState({
			correct: correct
		})
	}
	acceptAnswer() {
		let usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
		this.setState({
			selectedNumbers: [],
			usedNumbers: usedNumbers,
			correct: null,
			numberOfStars: this.randomNumber()
		},() => {
			this.updateDoneStatus()
		})
	}
	reDraw() {
		if(this.state.reDraws > 0) {
			this.setState({
				selectedNumbers: [],
				correct: null,
				numberOfStars: this.randomNumber(),
				reDraws: this.state.reDraws - 1
			})
		}
	}
	possibleSolutions() {
		let possibleNumbers = [],
			usedNumbers = this.state.usedNumbers;
		for(let i = 1; i <= 9; i++) {
			if(usedNumbers.indexOf(i) < 0) {
				possibleNumbers.push(i);
			}
		}
		return this.possibleCombinationSum(possibleNumbers, this.state.numberOfStars)
	}
	possibleCombinationSum (arr, n) {
		if (arr.indexOf(n) >= 0) { return true; }
		if (arr[0] > n) { return false; }
		if (arr[arr.length - 1] > n) {
			arr.pop();
			this.possibleCombinationSum(arr, n);
		}
		let listSize = arr.length, combinationsCount = (1 << listSize)
		for (let i = 1; i < combinationsCount ; i++ ) {
			let combinationSum = 0;
			for (let j=0 ; j < listSize ; j++) {
				if (i & (1 << j)) { combinationSum += arr[j]; }
			}
			if (n === combinationSum) { return true; }
		}
		return false;
	}
	updateDoneStatus() {
		if(this.state.usedNumbers.length === 9) {
			this.setState({
				doneStatus: 'Done. Nice!'
			})
			return;
		}
		if(this.state.reDraws === 0 && !this.possibleSolutions()) {
			this.setState({
				doneStatus: 'Game over :('
			})
		}
	}
	render(props,state) {
		let bottomFrame;
		if(state.doneStatus) {
			bottomFrame = <DoneFrame {...state} resetGame={this.resetGame.bind(this)} />
		}
		else {
			bottomFrame = <NumbersFrame {...state} clickNumber={this.clickNumber.bind(this)} />
		}
		return (
			<div id="game">
				<h1>Play nine!</h1>
				<hr />
				<div class="clearfix">
					<StarsFrame {...state} />
					<ButtonsFrame {...state}
						reDraw={this.reDraw.bind(this)}
						checkAnswer={this.checkAnswer.bind(this)}
						acceptAnswer={this.acceptAnswer.bind(this)} />
					<AnswerFrame {...state} unClickNumber={this.unClickNumber.bind(this)}/>
				</div>
				{bottomFrame}
			</div>
		)
	}
}

render(<Game />, document.getElementById('container'))