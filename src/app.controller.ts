import { BadRequestException, Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { CreateStudentDTO } from './createstudent.dto.js';
import { error } from 'console';


interface Student {
  name: string;
  age: number;
}




@Controller()
export class AppController {

  students: Student[] =[];

  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'My First NestJS App'
    }
  }

  @Get('newstudent')
  @Render('newstudent')
  newStudentForm(){
    return{
      students: this.students
    }
  }

  @Post('newstudent')
  @Render('newstudent')
  newStudent(@Body() body: CreateStudentDTO){

    if(!body.name){
      //throw new BadRequestException("Érvénytelen név")
      return{
        error: 'Érvénytelne név',
        students: this.students,
        newStudent: body,
      }
    
    }

    if(!body.age){
      //throw new BadRequestException("Érvénytelen név")
      return{
        error: 'Érvénytelne kor',
        students: this.students,
        newStudent: body,
      }
    
    }

    const age = parseInt(body.age);

    if(!age || age<0){
      return{
        error:"Nincs életkor",
        students: this.students
      }
    }



    const student: Student = {
      name: body.name,
      age: parseInt(body.age),
    }
    this.students.push(student);

    return {
      students: this.students
    }
  }
}
