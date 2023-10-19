import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ITask} from "../../models/task";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoForm!: FormGroup;
  tasks: ITask[] = [
    {
      description: 'Разобрать вопросы по JS',
      done: true
    },
    {
      description: 'Разобрать общие вопросы',
      done: true
    },
    {
      description: 'Разобрать вопросы по TS',
      done: true
    },
    {
      description: 'Разобрать вопросы по RxJS',
      done: true
    },
    {
      description: 'Разобрать вопросы по Angular',
      done: false
    },
  ];
  done: ITask[] = [];
  updateIndex!: number;
  isEditEnable: boolean = false;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      task: ['', Validators.required]
    })
    console.log(this.todoForm)
  }

  onAddTask() {
    if (this.todoForm.value.task.trim()) {
      this.tasks.unshift({
        description: this.todoForm.value.task,
        done: false
      })
    } else {
      //add error logic
    }
    this.todoForm.reset()
  }

  onCheckDone(todo: ITask) {
    todo.done = !todo.done
  }

  onDeleteTask(i: number) {
    this.tasks.splice(i, 1);
    this.todoForm.reset();
    this.isEditEnable = false;
  }


  onEditTask(todo: ITask, i: number) {
    this.todoForm.controls['task'].setValue(todo.description);
    this.updateIndex = i;
    this.isEditEnable = true;
  }

  onUpdateTask() {
    this.tasks[this.updateIndex].description = this.todoForm.value.task;
    this.tasks[this.updateIndex].done = false;
    this.todoForm.reset();
    this.isEditEnable = false;
  }
}
