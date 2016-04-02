import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Plants } from '../api/plants.js';

import './plant.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.body.helpers({
  plants() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter Plants
      return Plants.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the Plants
    return Plants.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Plants.find({ checked: { $ne: true } }).count();
  },
});

Template.body.events({
  'submit .new-plant'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Open modal for more information
    Modal.show('newPlant');

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    Plants.insert({
      text,
      createdAt: new Date(), // current time
    });

    // Clear form
    target.text.value = '';
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});
