import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, provideStore } from '@ngrx/store';
import { Todo } from '../models/todo';
import { todos } from "../reducers/todos";
import { filter } from "../reducers/filter";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/combineLatest';


@Component({
  selector: 'todo-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>Todo list</h2>
    <todo-filter
       (updateFilter)="updateFilter($event)"
    >
    </todo-filter>
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
  public todos;

  constructor(private store: Store<any>) {
    this.todos = Observable.combineLatest(
			store.select('todos'),
			store.select('filter'),
			(todos: Todo[], filter: any) => {
        return todos.filter(filter);
      }
    )
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

  updateFilter(filter) {
		this.store.dispatch({ type: filter });
	}
}
