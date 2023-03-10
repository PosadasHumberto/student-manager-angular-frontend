import {Component, OnInit} from '@angular/core';
import {Student} from "./models/student";
import {StudentService} from "./services/student.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  //attributes
  public title = 'Students Manager';
  public students : Student[];

  //constructor
  constructor(
    private studentService : StudentService
  ) {

  }

  ngOnInit() {
    //this.students is going to be initialized when getstudents returns a response
    this.getStudents();
  }

  //methods
  public getStudents() : void {
    this.studentService.getStudents().subscribe(
      (response : Student[]) => {this.students = response;},
      (error : HttpErrorResponse) => {alert(error.message)}
    )
  }
}
