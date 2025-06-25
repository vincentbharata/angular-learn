import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Animal } from '../model/animate.interface';
import { Table } from './shared/table/table';
import { kreditur } from '../model/creditur.interface';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ListForm } from './shared/list/list-form';
import { ListTable } from './shared/list/list-table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    Table,
    FormsModule,
    ReactiveFormsModule,
    ListForm,
    ListTable,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {
  title: string = 'fif-june-angular';
  testVariable: string = 'something';
  anotherVariabel: string = 'value pertama';
  isApproved: boolean = true;
  dp: number = 0;
  testFromChild: string = '';
  imgUrl: string = 'https://picsum.photos/200/300';
  name: string = '';

  fruit: string[] = [];
  animal: Array<Animal> = [];
  animals: Animal[] = [
    {
      name: 'badak',
      age: 10,
    },
    {
      name: 'harimau',
    },
  ];

  parentData: kreditur[] = [
    {
      name: 'John Doe',
      age: 30,
      job: 'Software Engineer',
    },
    {
      name: 'Jane Smith',
      age: 25,
      job: 'Data Scientist',
    },
    {
      name: 'Alice Johnson',
      age: 28,
      job: 'Data Scientist',
    },
    {
      name: 'Bob Brown',
      age: 40,
      job: 'Product Manager',
    },
    {
      name: 'Charlie Black',
      age: 35,
      job: 'UX Designer',
    },
    {
      name: 'Diana White',
      age: 22,
      job: 'Marketing Specialist',
    },
    {
      name: 'Ethan Green',
      age: 33,
      job: 'DevOps Engineer',
    },
    {
      name: 'Fiona Blue',
      age: 29,
      job: 'QA Engineer',
    },
    {
      name: 'George Yellow',
      age: 31,
      job: 'System Administrator',
    },
    {
      name: 'Hannah Purple',
      age: 27,
      job: 'Business Analyst',
    },
  ];

  testFunction() {
    const testVariable = 'test variable';
    this.anotherVariabel = testVariable;
  }

  anotherFunction() {
    let testVariable = 'test variable';
    testVariable = 'lalal';
    this.testVariable = 'someeee';
  }
  receivedFromChild(event: string) {
    this.testFromChild = event;
  }
  submit() {
    console.log('dataa');
  }

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  //folder list

  krediturList: kreditur[] = [
    { name: 'Vin', age: 23, job: 'Data Analyst' },
    { name: 'Cent', age: 24, job: 'Data Scientist' },
  ];

  addKreditur(newKreditur: kreditur) {
    this.krediturList = [...this.krediturList, newKreditur];
  }

  deleteKreditur(index: number) {
    this.krediturList = this.krediturList.filter((_, i) => i !== index);
  }
}
