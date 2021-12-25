import * as ActionTypes from "./ActionTypes";

//this is a reducer function
export const favorites = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_FAVORITE:
      if (state.includes(action.payload)) {
        return state;
      }
      return state.concat(action.payload); //concat copies array and concats new item and returns new array

    default:
      return state;
  }
};
