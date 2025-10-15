import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TodoTask } from '@app/models/todo-task.model';
import { TodoService } from '@app/services/todo.service';
 

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
    @ViewChildren(CdkDropList) dropListRefs!: QueryList<CdkDropList>;
  dropLists: CdkDropList[] = [];
  tasks: TodoTask[] = [];
  columns = [
    { status: 'Pending', tasks: [] as TodoTask[] },
    { status: 'In Progress', tasks: [] as TodoTask[] },
    { status: 'On Hold', tasks: [] as TodoTask[] },
    { status: 'Completed', tasks: [] as TodoTask[] },
    { status: 'Cancelled', tasks: [] as TodoTask[] }
  ];

  editing?: TodoTask | null = null;

  constructor(private svc: TodoService) {}

  ngOnInit(): void {
    this.load();
  }

  ngAfterViewInit() {
    // ✅ after view init, collect all drop lists
    this.dropLists = this.dropListRefs.toArray();
  }
  load(): void {
    this.svc.getAll().subscribe(list => {
      this.tasks = list;
      this.refreshColumns();
    });
  }

  refreshColumns() {
    this.columns.forEach(c => c.tasks = []);
    this.tasks.forEach(t => {
      const col = this.columns.find(c => c.status === t.status);
      (col?.tasks || this.columns[0].tasks).push(t);
    });
  }

drop(event: CdkDragDrop<TodoTask[]>, status: string) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  // Update task status
  const moved = event.container.data[event.currentIndex];
  if (moved) {
    moved.status = status as any;
    this.svc.update(moved).subscribe(() => console.log('Updated task →', moved));
  }
}

  isOverdue(t: TodoTask): boolean {
    return t.dueDate ? (t.status !== 'Completed' && t.dueDate < new Date().toISOString().slice(0,10)) : false;
  }

  add() {
    this.editing = { title: '', moduleType: 'RENT', priority: 'Medium', status: 'Pending' } as TodoTask;
  }

  edit(task: TodoTask) {
    this.editing = { ...task };
  }

  closeForm() {
    this.editing = null;
  }

  save(task: TodoTask) {
    if (task.id) this.svc.update(task).subscribe(() => this.load());
    else this.svc.add(task).subscribe(() => this.load());
    this.editing = null;
  }

  delete(t: TodoTask) {
    if (t.id && confirm('Delete task?')) {
      this.svc.delete(t.id).subscribe(() => this.load());
    }
  }
}
