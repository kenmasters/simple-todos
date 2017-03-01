import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks';
import Task from './Task';
 
// App component - represents the whole app
export default class App extends Component {
  
  constructor(props) {
    super(props);
    // console.log(this);

    //assign initial state
    this.state = {
      hideCompleted: false
    };
  }

  getTasks() {
    let tasks = [];
    for (var i = 10; i >= 1; i--) {
      tasks.push({ _id: i, text: `This is task ${i}` });
    }
    return tasks;
  }

  renderTasks() {
    let tasks = this.props.tasks;
    if ( this.state.hideCompleted ) {
      tasks = tasks.filter(task => !task.checked);
    }
    return tasks.map( task => <Task key={task._id} task={task} /> );
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
          <label className="hide-completed">
            <input type="checkbox" checked={this.state.hideCompleted} onChange={this._toggleHideCompleted}/>Hide Completed Tasks
          </label>
        <form className="new-task" onSubmit={this._handleSubmit}>
          <input type="text" ref={(task) => { this.task = task; }} placeholder="Type to add new tasks" />
        </form>
        </header>
        { this.props.tasks.length === 0 ? <h3>No task yet.</h3> : '' }
        <ul>
          {this.renderTasks()}
        </ul>

      </div>
    );
  }

  _handleSubmit = (e) => {
    e.preventDefault();

    // Find the text field via the React ref
    const task = this.task.value.trim();

    if (!task) {
      return;
    }

    // Insert new task
    Tasks.insert({
      text: task,
      createdAt: new Date(), // current time
    });

    console.log(`form submitted: ${task}`);
    this.task.value = '';
  }

  _toggleHideCompleted = () => {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

}

App.defaultProps = {};
App.propTypes = {
  tasks: PropTypes.array.isRequired,
};
 
export default createContainer(() => {
  return {
    tasks: Tasks.find({}, {
      sort:{createdAt: -1}
    }).fetch()
  };
}, App);


