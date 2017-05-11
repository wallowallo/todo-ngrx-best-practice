import { ActionReducer } from "@ngrx/store";

export interface AppState {
  Todos: Todo[],
  filter: any
}

export interface Todo {
  text: string,
  id: number,
  completed: boolean,
  dateAdded: any
}

export interface TodoModel {
  filteredTodos: Todo[],
  totalTodos: number,
  completedTodos: number
}

export interface UndoableState {
  past: any[],
  present: any,
  future: any[]
}
