export class Todo {
  constructor(
  public text: string,
  public isEdit: boolean,
  public id: number,
  public completed: boolean,
  public dateAdded: any) { }
}
