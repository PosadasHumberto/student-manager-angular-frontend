import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "../models/student";
import {environment} from "../../environments/environment.development";

@Injectable()
export class StudentService {

  //attributes
  private basicUrl : string = environment.basicUrl;

  //constructor
  constructor(
    private http : HttpClient
  ) {

  }


  //methods
  public getStudents() : Observable<Student[]> {
    return this.http.get<Student[]>(this.basicUrl + "all");
  }

  public addStudent(student : Student) : Observable<Student> {
    return this.http.post<Student>(this.basicUrl + "add", student);
  }

  public updateStudent(student : Student) : Observable<Student> {
    return this.http.put<Student>(this.basicUrl + "update", student);
  }

  public deleteStudent(id : number) : Observable<void> {
    return this.http.delete<void>(this.basicUrl + `/${id}`);
  }

}
