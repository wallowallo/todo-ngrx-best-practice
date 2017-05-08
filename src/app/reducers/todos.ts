const initialState = [];


export function todos ( state = initialState, { type, payload } ) {
  switch ( type ) {
    case 'ADD_TODO':
      return [
        ...state,
        payload
      ];

    case 'UPDATE_TODO':
      return state.map( todo => ( todo.id === payload.id ) ?
        ({ ...todo, title: payload.title, isEdit: false, completed: false }) :
        todo );

    case 'REMOVE_TODO':
      return state.filter( todo => todo.id !== payload );

    case 'TOGGLE_TODO_COMPLETED':
      return state.map( todo =>
        ( todo.id === payload ) ?
        ({ ...todo, completed: !todo.completed }) :
        todo );

    case 'TOGGLE_EDIT_TODO':
      return state.map( todo =>
        ( todo.id === payload ) ?
        ({ ...todo, isEdit: !todo.isEdit }) :
        ({ ...todo, isEdit: todo.isEdit = false }) );

    default:
      return state;
  }
};
