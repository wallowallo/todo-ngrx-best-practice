const initialState = [];

export function todos ( state = initialState, { type, payload } ) {
  switch ( type ) {
    case 'ADD_TODO':
      return [
        ...state,
        payload
      ];

    case 'REMOVE_TODO':
      return state.filter( todo => todo.id !== payload );

    case 'TOGGLE_TODO_COMPLETED':
      return state.map( todo =>
        ( todo.id === payload )
        ? ({ ...todo, completed: !todo.completed })
        : todo );

    default:
      return state;
  }
};
