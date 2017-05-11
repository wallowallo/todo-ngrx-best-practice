import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { environment } from '../environments/environment';

import { TodoComponent } from './containers/todo';
import { FilterSelectComponent } from './components/filter-select';
import { TodoInputComponent } from './components/todo-input';
import { TodoListComponent } from './components/todo-list';

import { StoreModule, combineReducers, ActionReducer } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MaterialModule } from '@angular/material';

import { todos } from './reducers/todos';
import { filter } from './reducers/filter';
import { undoable } from './reducers/undoable';

export interface State {
  todos;
  filter;
  undoable;
}

const reducers = {
  todos: undoable(todos),
  filter
};

const developmentReducer: ActionReducer<State> = compose(combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

// This is required for AOT
export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

@NgModule({
  declarations: [
    TodoComponent,
    TodoInputComponent,
    TodoListComponent,
    FilterSelectComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    // EffectsModule.run(BookEffects)
  ],
  providers: [],
  bootstrap: [TodoComponent]
})
export class AppModule { }
