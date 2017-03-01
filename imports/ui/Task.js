import React, { Component, PropTypes } from 'react';

import { Tasks } from '../api/tasks';

// Task component - represents a single todo item
class Task extends Component {
  render() {
	// Give tasks a different className when they are checked off,
	// so that we can style them nicely in CSS
	const taskClassName = this.props.task.checked ? 'checked' : '';
	const deleted = this.props.task.deleted ? 'deleted' : '';

    return (
		<li className={taskClassName}>
			<button className="delete" onClick={this._deleteThisTask}>&times;</button>
			<input type="checkbox" checked={this.props.task.checked} onChange={this._toggleChecked} />
			<span className={'text ' + deleted}>{this.props.task.text}</span>
		</li>
    );
  }

  _toggleChecked = () => {
    // Set the checked property to the opposite of its current value
    Tasks.update(this.props.task._id, {
      $set: { checked: !this.props.task.checked },
    });
  }

  _deleteThisTask = () => {
  	// Soft delete
  	// Tasks.update(this.props.task._id, {
   //    $set: { deleted: !this.props.task.deleted },
   //  });

    // Hard delete ( Removes data to our database )
    Tasks.remove(this.props.task._id);
  }

}

export default Task;

// This component gets the task to display through a React prop.
// We can use propTypes to indicate it is required
Task.propTypes = {
  task: PropTypes.object.isRequired,
};
