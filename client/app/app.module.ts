import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {TasksComponent} from './components/tasks/tasks.component';
import {StudentEditComponent} from './components/student-edit/student-edit.component'

@NgModule({
  imports:      [ BrowserModule , HttpModule, FormsModule],
  declarations: [AppComponent,TasksComponent,StudentEditComponent],
  bootstrap: [AppComponent]
})
export class AppModule { } 
