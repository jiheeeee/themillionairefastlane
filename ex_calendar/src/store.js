import { createStore } from 'redux';

export default createStore(function (state, action) {
  if (state === undefined) {
    return {
      prjCalendar: [],
      developers: [],
    };
  }
  switch (action.type) {
    case 'initializecontent':
      state.prjCalendar = [];
      for (var i = 0; i < action.prjCalendar.length; i++) {
        state = {
          ...state,
          prjCalendar: [...state.prjCalendar, action.prjCalendar[i]]
        };
      }
      return state;
    case 'loadDevelopers':
      state.developers = [];
      for (var i = 0; i < action.developers.length; i++) {
        state = {
          ...state,
          developers: [...state.developers, action.developers[i]]
        };
      }
      return state;
    default:
      return state;
  }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
