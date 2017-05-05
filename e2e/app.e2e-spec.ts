import { TodoNgrxBestPracticePage } from './app.po';

describe('todo-ngrx-best-practice App', () => {
  let page: TodoNgrxBestPracticePage;

  beforeEach(() => {
    page = new TodoNgrxBestPracticePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
