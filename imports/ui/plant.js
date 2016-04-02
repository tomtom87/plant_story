import { Template } from 'meteor/templating';

import { Plants } from '../api/plants.js';

import './plant.html';

Template.plant.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Plants.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    Plants.remove(this._id);
  },
});
