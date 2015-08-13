import Coordinator from '../models/coordinator';

export default {
  name: "setup coordinator",

  initialize: function initialize(container, app) {
    app.register("drag:coordinator", Coordinator);
    app.inject("component", "coordinator", "drag:coordinator");
  }
};