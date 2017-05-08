import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'todo-filter',
  template: `
    <select #selectList (change)="updateFilter.emit(selectList.value)">
      <option *ngFor="let filter of filters" value="{{filter.action}}">
        {{filter.friendly}}
      </option>
    </select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodoFilterComponent {
  public filters = [
    { friendly: 'All', action: 'SHOW_ALL' },
    { friendly: 'Uncompleted', action: 'SHOW_UNCOMPLETED' },
    { friendly: 'Completed', action: 'SHOW_COMPLETED' }
  ];
  @Output() updateFilter: EventEmitter<string> = new EventEmitter<string>();
}
