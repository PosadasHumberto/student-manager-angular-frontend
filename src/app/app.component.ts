import {Component, OnInit} from '@angular/core';
import {Student} from "./models/student";
import {StudentService} from "./services/student.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  //attributes
  public title = 'Students Manager';
  public students : Student[];
  public editStudent : Student | null;
  public deleteStudent : Student | null;

  //constructor
  constructor(
    private studentService : StudentService,
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

  /*Método que va a crear un boton en el DOM el cual se va a encargar de lanzar
  * la ventana modal que corresponda a la accion deseada (crear, modificar o
  * eliminar un estudiante*/
  public onOpenModal(student : Student | null, mode : String) {

    //recuperando el elemento que va a mostrar el boton
    const container = document.getElementById("main-container")

    //creando el boton programaticamente
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    //establecr el target del boton segun en donde ha sido presionado lanzara
    // el modal que corresponde
    if (mode === "add"){
      button.setAttribute('data-target', '#addStudentModal')
    }

    if (mode === "edit"){
      this.editStudent = student;
      button.setAttribute('data-target', '#editStudentModal');
    }

    if (mode === "delete"){
      this.deleteStudent = student;
      button.setAttribute('data-target', '#deleteStudentModal')
    }

    //agregar el boton al elemento container
    container?.appendChild(button);
    button.click();     //The click() method simulates a mouse-click on an element
  }

  onAddStudent(addForm : NgForm) :void {

    this.studentService.addStudent(addForm.value as Student).subscribe(
      (response : Student) => {
        console.log(response);
        this.getStudents(); //relanzar la carga de los estudiantes en el arreglo Sudents[] que sera mostrado a la vista
        addForm.resetForm();
        document.getElementById('add-student-form')?.click();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
        addForm.resetForm();
      }
    );

  }

  onUpdateStudent(student : Student) : void {
    this.studentService.updateStudent(student).subscribe(
      (response : Student) => {
        console.log(response);
        this.getStudents();
        document.getElementById('closeEdit')?.click();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  onDeleteStudent(student : Student) : void {
    if(confirm("Are you sure you want to delete student: " + student.name + " ?")){
      this.studentService.deleteStudent(student.id).subscribe(
        (response : void) => {
          console.log(response);
          this.getStudents();
        },
        (error : HttpErrorResponse) => {
          alert(error.message)
        }
      )
    }

  }

}
