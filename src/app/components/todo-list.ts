import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Todo, TodoModel } from "../interfaces/interfaces";

@Component({
    selector: 'todo-list',
    template: `
      <ul>
        <li
          *ngFor="let todo of todosModel.filteredTodos"
          [class.completed]="todo.completed"
        >
           {{todo.text}} - Added: {{todo.dateAdded | date: 'd/M/y'}}
           <input type="checkbox" [checked]="todo.completed" (change)="toggleCompleted.emit(todo.id)" />
           <button (click)="removeTodo.emit(todo.id)">Delete</button>
        </li>
      </ul>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodoListComponent {
  @Input() todosModel : TodoModel[];
  @Output() removeTodo : EventEmitter<number> = new EventEmitter<number>();
  @Output() toggleCompleted : EventEmitter<number> = new EventEmitter<number>();
}
