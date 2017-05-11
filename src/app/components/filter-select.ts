import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'filter-select',
  template: `
    <select #selectList (change)="filterSelect.emit(selectList.value)">
      <option *ngFor="let filter of filters" value="{{filter.action}}">
        {{filter.friendly}}
      </option>
    </select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FilterSelectComponent {
  public filters = [
    { friendly: 'All', action: 'SHOW_ALL' },
    { friendly: 'Uncompleted', action: 'SHOW_UNCOMPLETED' },
    { friendly: 'Completed', action: 'SHOW_COMPLETED' }
  ];
  @Output() filterSelect: EventEmitter<string> = new EventEmitter<string>();
}
