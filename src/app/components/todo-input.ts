import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'todo-input',
  template: `
    <input #todoText type="text" />
    <button (click)="add(todoText)">Add Todo</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodoInputComponent {
  @Output() addTodo = new EventEmitter();

  add(todoInput) {
    this.addTodo.emit(todoInput.value);
    todoInput.value = '';
  }
}
