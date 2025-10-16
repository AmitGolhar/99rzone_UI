import { Component, OnInit, AfterViewInit, QueryList, ViewChildren, OnDestroy } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TodoTask } from '@app/models/todo-task.model';
import { TodoService } from '@app/services/todo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(CdkDropList) dropListRefs!: QueryList<CdkDropList>;
  dropLists: CdkDropList[] = [];
  tasks: TodoTask[] = [];

  // ✅ Kanban Columns
  columns = [
    { status: 'Pending', tasks: [] as TodoTask[] },
    { status: 'In Progress', tasks: [] as TodoTask[] },
    { status: 'On Hold', tasks: [] as TodoTask[] },
    { status: 'Completed', tasks: [] as TodoTask[] },
    { status: 'Cancelled', tasks: [] as TodoTask[] }
  ];

  editing?: TodoTask | null = null;
  private liveSub?: Subscription;

  constructor(private svc: TodoService) {}

  ngOnInit(): void {
    // ✅ Listen to real-time updates from the backend
    this.liveSub = this.svc.listen().subscribe(list => {
      this.tasks = list;
      this.refreshColumns();
    });

    // ✅ Initial fetch in case SSE takes a moment to connect
    this.svc.listen().subscribe(list => {
      this.tasks = list;
      this.refreshColumns();
    });
  }

  ngAfterViewInit(): void {
    // Collect drop lists after view initialization
    this.dropLists = this.dropListRefs.toArray();
  }

  ngOnDestroy(): void {
    // Clean up the subscription
    this.liveSub?.unsubscribe();
  }

  /** ✅ Organize tasks into columns by status */
  refreshColumns(): void {
    this.columns.forEach(c => c.tasks = []);
    this.tasks.forEach(t => {
      const col = this.columns.find(c => c.status === t.status);
      (col?.tasks || this.columns[0].tasks).push(t);
    });
  }

  /** ✅ Drag-and-drop task reordering + status updates */
drop(event: CdkDragDrop<TodoTask[]>, status: string): void {
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

  const moved = event.container.data[event.currentIndex];
  if (moved) {
    moved.status = status as TodoTask['status']; // ✅ fix
    this.svc.update(moved).subscribe({
      next: () => console.log(`✅ Task updated → ${moved.title} (${status})`),
      error: err => console.error('❌ Update failed:', err)
    });
  }
}


  /** ✅ Check if a task is overdue */
  isOverdue(t: TodoTask): boolean {
    return t.dueDate
      ? (t.status !== 'Completed' && t.dueDate < new Date().toISOString().slice(0, 10))
      : false;
  }

  /** ✅ Add new task */
  add(): void {
    this.editing = { title: '', moduleType: 'RENT', priority: 'Medium', status: 'Pending' } as TodoTask;
  }

  /** ✅ Edit task */
  edit(task: TodoTask): void {
    this.editing = { ...task };
  }

  /** ✅ Close modal */
  closeForm(): void {
    this.editing = null;
  }

  /** ✅ Save new or edited task */
  save(task: TodoTask): void {
    const request = task.id ? this.svc.update(task) : this.svc.add(task);
    request.subscribe({
      next: () => {
        this.editing = null;
        console.log(`💾 Task saved successfully → ${task.title}`);
      },
      error: err => console.error('❌ Failed to save task:', err)
    });
  }

  /** ✅ Delete task */
  delete(t: TodoTask): void {
    if (t.id && confirm(`Delete task "${t.title}"?`)) {
      this.svc.delete(t.id).subscribe({
        next: () => console.log(`🗑️ Task deleted → ${t.title}`),
        error: err => console.error('❌ Failed to delete task:', err)
      });
    }
  }
}
