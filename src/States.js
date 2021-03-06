// Generated by CoffeeScript 1.7.1
var State, dispatcher;

State = function(navList, eventList, screen) {
  this.navList = navList;
  this.eventList = eventList;
  this.screen = screen;
  this.load = function() {
    this.beforeState();
    this.duringState();
    return this;
  };
  this.beforeState = function() {
    this.addScreen();
    return null;
  };
  this.addScreen = function() {
    app.addChild(this.screen);
    return null;
  };
  this.duringState = function() {
    return null;
  };
  this.filterCommands = function() {
    return null;
  };
  this.unload = function() {
    this.afterState();
    return null;
  };
  this.afterState = function() {
    this.removeScreen();
    return null;
  };
  this.removeScreen = function() {
    app.removeChild(this.screen);
    return null;
  };
  return this;
};

dispatcher = {
  initScreens: function() {
    return this.screens = {
      splash1: initSplash1(),
      splash2: initSplash2(),
      board: app.board
    };
  },
  initStates: function() {
    var splash1, splash2;
    splash1 = new State({
      nextSplash: "splash2"
    }, [], this.screens.splash1);
    splash1.duringState = function() {
      return new cjs.Tween().wait(300).call(app.dispatcher.dispatch, [new cjs.Event("nextSplash")], app.dispatcher);
    };
    splash2 = new State({
      nextSplash: "board"
    }, [], this.screens.splash2);
    splash2.duringState = function() {
      return new cjs.Tween().wait(300).call(app.dispatcher.dispatch, [new cjs.Event("nextSplash")], app.dispatcher);
    };
    return this.states = {
      splash1: splash1,
      splash2: splash2,
      board: new State({}, [], this.screens.board)
    };
  },
  init: function() {
    cjs.EventDispatcher.initialize(this);
    this.initScreens();
    this.initStates();
    this.current_state = this.states.splash1.load();
    return this;
  },
  dispatch: function(event) {
    if (this.current_state.navList[event.type] !== void 0) {
      this.current_state.unload();
      this.current_state = this.states[this.current_state.navList[event.type]].load();
    }
    return null;
  }
};

//# sourceMappingURL=States.map
