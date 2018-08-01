import React, { Component } from 'react';
import axios from 'axios';

import PageHeader from '../template/pageheader';
import TodoForm from './todoForm';
import TodoList from './todoList';

const URL = 'http://localhost:3003/api/todos';

export default class Todo extends Component {
	
	constructor(props) {
		super(props);
		this.state 		= { description: '', list: [] };
		
		this.handleChange = this.handleChange.bind(this);
		this.handleAdd	= this.handleAdd.bind(this);
		
		this.handleMarkAsDone = this.handleMarkAsDone.bind(this);
		this.handleMarkAsPending = this.handleMarkAsPending.bind(this);
		this.handleRemove = this.handleRemove.bind(this);

		this.refresh();
	}

	refresh() {
		axios.get(`${URL}?sort=-CreatedAt`)
			.then(resp => this.setState({...this.state,
			description: '', list: resp.data}));
	}

	handleChange(e) {
		this.setState({...this.state,
			// pego o valor da descrição a 
			// partir do evento do input
			description: e.target.value});
	}

	handleAdd() {
		const description = this.state.description;
		axios.post(URL, {description})
			.then(resp => this.refresh());
	}

	handleRemove(todo) {
		axios.delete(`${URL}/${todo._id}`)
			.then(resp => this.refresh());
	}

	handleMarkAsDone(todo) {
		axios.put(`${URL}/${todo._id}`, 
				{...todo, done: true})
			.then(resp => this.refresh());
	}

	handleMarkAsPending(todo) {
		axios.put(`${URL}/${todo._id}`, 
				{...todo, done: false})
			.then(resp => this.refresh());
	}
	
	render() {
		return (
			<div>
				<PageHeader name="Tarefas" small="Cadastro" />
				<TodoForm
					description={this.state.description}
				 	handleChange={this.handleChange}
				 	handleAdd={this.handleAdd}/>
				<TodoList
					list={this.state.list}
					handleMarkAsDone={this.handleMarkAsDone}
					handleMarkAsPending={this.handleMarkAsPending}
					handleRemove={this.handleRemove} />
			</div>
		);
	}
}