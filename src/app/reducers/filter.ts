import { ActionReducer, Action } from "@ngrx/store";
import { SHOW_COMPLETED, SHOW_UNCOMPLETED, SHOW_ALL } from "../actions/actions";

export const filter : ActionReducer<any> = (state : any = t => t, action : Action) => {
  switch ( action.type ) {
    case 'SHOW_UNCOMPLETED':
      return todo => !todo.completed;

    case 'SHOW_ALL':
      return todo => todo;

    case 'SHOW_COMPLETED':
      return todo => todo.completed;

    default:
      return state;
  }
};
