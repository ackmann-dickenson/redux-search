"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createStore;
function createStore(initialState, registrar) {
  return function () {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];
    var handlers = arguments.length <= 2 || arguments[2] === undefined ? registrar(state, action) : arguments[2];
    return handlers[action.type] ? handlers[action.type]() : state;
  };
}