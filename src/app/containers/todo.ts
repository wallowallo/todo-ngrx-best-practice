import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { todos } from '../reducers/todos';
import { filter } from '../reducers/filter';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/combineLatest';

import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO_COMPLETED, UNDO, REDO } from '../actions/actions';
import { AppState, Todo, TodoModel } from "../interfaces/interfaces";


@Component({
  selector: 'todo-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>Todo list</h2>
    <filter-select
      (filterSelect)="updateFilter($event)"
    >
    </filter-select>
    <todo-input
      (addTodo)="addTodo($event)"
    >
    </todo-input>
    <button
				(click)="undo()">
				Undo
			</button>
			<button
				(click)="redo()">
				Redo
			</button>
    <todo-list
      [todosModel]="todosModel$ | async"
      (toggleCompleted)="toggleCompleted($event)"
      (removeTodo)="removeTodo($event)"
    >
    </todo-list>
  `
})

export class TodoComponent {
  todosModel$ : Observable<TodoModel>;

  constructor(private store: Store<AppState>) {
    const todos$ = store.select('todos');
		const filter$ = store.select('filter');

    this.todosModel$ = Observable.combineLatest(
		  todos$,
			filter$,
			({ present = [] }, filter : any) => {
        return {
  			  filteredTodos: present.filter(filter),
  				totalTodos: present.length,
  				completedTodos: present.filter((todo : Todo) => todo.completed).length
  			}
      }
    );
  }

  addTodo(text: string) {
    this.store.dispatch({ type: ADD_TODO, payload: {
      id: new Date().getTime(),
      text,
      completed: false,
      dateAdded: new Date()
    }});
  }

  removeTodo(id : number) {
	  this.store.dispatch({ type: REMOVE_TODO, payload: id });
	}


	toggleCompleted(id : number) {
		this.store.dispatch({ type: TOGGLE_TODO_COMPLETED, payload: id });
	}

  updateFilter(filter) {
		this.store.dispatch({ type: filter });
	}

  undo(){
		this.store.dispatch({ type: UNDO });
	}

  redo(){
		this.store.dispatch({ type: REDO });
	}
}
