import { Injectable } from '@angular/core';
import { kreditur } from '../../model/creditur.interface';

@Injectable({
  providedIn: 'root'
})
export class CrediturData {
  private crediturList: kreditur[] = [
    { name: 'John Doe', age: 30, job: 'Software Engineer', creditScore: this.generateRandomCreditScore() },
    { name: 'Jane Smith', age: 25, job: 'Data Scientist', creditScore: this.generateRandomCreditScore() },
    { name: 'Alice Johnson', age: 28, job: 'UX Designer', creditScore: this.generateRandomCreditScore() },
    { name: 'Bob Brown', age: 35, job: 'Product Manager', creditScore: this.generateRandomCreditScore() }
  ];

  constructor() { }

  private generateRandomCreditScore(): number {
    return Math.floor(Math.random() * 100) + 1;
  }

  getData(): kreditur[] {
    return [...this.crediturList];
  }

  addData(newCreditur: kreditur): void {
    newCreditur.creditScore = this.generateRandomCreditScore();
    this.crediturList.push(newCreditur);
  }

  deleteData(index: number): void {
    if (index >= 0 && index < this.crediturList.length) {
      this.crediturList.splice(index, 1);
    }
  }

  getDataLength(): number {
    return this.crediturList.length;
  }

  getCrediturByName(name: string): kreditur | undefined {
    return this.crediturList.find(creditur => creditur.name === name);
  }
}
