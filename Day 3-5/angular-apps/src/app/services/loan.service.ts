import { Injectable } from '@angular/core';
import { LoanApplication } from '../../model/loan-application.interface';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private loanApplications: LoanApplication[] = [];
  private nextId: number = 1;

  constructor() { }

  getLoanApplications(): LoanApplication[] {
    return [...this.loanApplications];
  }

  addLoanApplication(loanApp: Omit<LoanApplication, 'no'>): void {
    const newLoanApp: LoanApplication = {
      no: this.nextId++,
      ...loanApp
    };
    this.loanApplications.push(newLoanApp);
  }

  deleteLoanApplication(index: number): void {
    if (index >= 0 && index < this.loanApplications.length) {
      this.loanApplications.splice(index, 1);
    }
  }

  validateCreditScore(creditScore: number): boolean {
    return creditScore >= 60;
  }
}
