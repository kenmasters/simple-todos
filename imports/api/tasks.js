import { Mongo } from 'meteor/mongo';
export const Tasks = new Mongo.Collection('tasks');

// Meteor.methods({
// 	'addTask': function() {
// 		Tasks.insert({ text: "Task " + Random.id(), createdAt: new Date() });
// 	},

// 	'deleteTask':  function() {
// 		let task = Tasks.findOne();
// 		if (task) {
// 			Task.remove({_id: task._id});
// 		}
// 	}


// });