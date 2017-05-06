import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, provideStore } from '@ngrx/store';
import { Todo } from '../models/todo';
import { todos } from "../reducers/todos";
//import { filter } from "../reducers/filter";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/let';


@Component({
  selector: 'todo-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>Todo list</h2>
    <todo-input
      (addTodo)="addTodo($event)"
    >
    </todo-input>
    <todo-list
      [todos]="todos | async"
      (toggleCompleted)="toggleCompleted($event)"
      (removeTodo)="removeTodo($event)"
    >
    </todo-list>
  `
})

export class TodoComponent {
  public todos: Observable<Todo[]>;

  constructor(private store: Store<any>) {
    this.todos = store.select('todos');
  }

  addTodo(text) {
    this.store.dispatch({ type: 'ADD_TODO', payload: {
        id: new Date().getTime(),
        text,
        isEdit: false,
        completed: false,
        dateAdded: new Date()
      }
    })
  }

  removeTodo({id}) {
		this.store.dispatch({ type: "REMOVE_TODO", payload: id });
	}


	toggleCompleted({id}) {
		this.store.dispatch({ type: "TOGGLE_TODO_COMPLETED", payload: id });
	}
}
