import { ActionReducer, Action } from '@ngrx/store';
import { Todo } from '../interfaces/interfaces';
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO_COMPLETED } from '../actions/actions';

export const todos : ActionReducer<Todo[]> = ( state : Todo[] = [], action: Action ) => {
  switch ( action.type ) {
    case 'ADD_TODO':
      return [
        ...state,
        action.payload
      ];

    case 'REMOVE_TODO':
      return state.filter( todo => todo.id !== action.payload );

    case 'TOGGLE_TODO_COMPLETED':
      return state.map( todo =>
        ( todo.id === action.payload )
        ? ({ ...todo, completed: !todo.completed })
        : todo );

    default:
      return state;
  }
};
