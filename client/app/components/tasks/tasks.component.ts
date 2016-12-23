import { Component } from '@angular/core';
import {TaskService} from '../../services/task.service'
import {Task} from '../../models/Task';

@Component({
  moduleId: module.id,
  selector: 'tasks',
  templateUrl: 'tasks.component.html'
})
export class TasksComponent {
  tasks: Task[];
  title: string;
  constructor(private TaskService:TaskService){
    this.TaskService.getTasks()
    .subscribe(tasks => {
      this.tasks = tasks;
    })
  }
  addTask(event: any){
    event.preventDefault();
    var newTask = {
      title: this.title,
      isDone: false
    }
    this.TaskService.addTask(newTask)
    .subscribe(task => {
      this.tasks.push(task);
      this.title = '';
    })
  }

  deleteTask(id: string){
    var tasks = this.tasks;

    this.TaskService.deleteTask(id)
    .subscribe(data => {
      if(data.n == 1){
        for( var i = 0; i < tasks.length; i ++){
          if(tasks[i]._id == id){
            tasks.splice(i,1);
          }
        }
      }
    })
  }

  updateStates(task:Task){
    var _task = {
      _id: task._id,
      title: task.title,
      isDone: !task.isDone
    };
    this.TaskService.updateStatus(_task).subscribe(data =>{
      task.isDone = !task.isDone;
    })
  }
 }
