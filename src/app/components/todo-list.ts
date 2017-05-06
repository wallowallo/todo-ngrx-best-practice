import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'todo-list',
    template: `
      <ul>
        <li
          *ngFor="let todo of todos"
          [class.completed]="todo.completed"
        >
           {{todo.text}} - Added: {{todo.dateAdded | date: 'd/M/y'}}
           <input type="checkbox" [checked]="todo.completed" (change)="toggleCompleted.emit(todo)" />
           <button (click)="removeTodo.emit(todo)">Delete</button>
        </li>
      </ul>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodoList {
    @Input() todos;
    @Output() removeTodo = new EventEmitter();
    @Output() toggleCompleted = new EventEmitter();
}
