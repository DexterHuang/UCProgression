import { Component } from '@angular/core';
import {Student} from '../../models/Student'
import {GeneralService} from '../../services/generalService'

@Component({
    moduleId: module.id,
    selector: 'student-edit',
    templateUrl: 'student-edit.component.html',
    styleUrls: ['student-edit.component.css']
})
export class StudentEditComponent {
    newStudent: Student = new Student();
    studentList: Student[];
    dataName: string = 'student';
    optionalAttributes:  string[] = [];
    constructor(private GeneralService:GeneralService){
         this.refreshList();
    }
    validate(){
        for(var key in this.newStudent){
            console.log(this.newStudent[key]);
            if(key in this.optionalAttributes == false && this.newStudent[key] == undefined){
                alert(key + " is not optional!");
                return false;
            }
        }
        return true;
    }
    refreshList(){
        this.GeneralService.getObjectList(this.dataName)
        .subscribe(students => {
            this.studentList = students;
        })
    }

    addStudent(event: any){
        if(this.validate()){
            event.preventDefault();
            this.GeneralService.addObject(this.dataName, this.newStudent)
            .subscribe(s => {
              this.studentList.push(s);
            })
        }
    }

    removeStudent(id: string){
        this.GeneralService.deleteObject(this.dataName,id)
        .subscribe(data =>{
            this.refreshList();
        })
    }
}
