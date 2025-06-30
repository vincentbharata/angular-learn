import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoanApplication } from '../../model/loan-application.interface';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private loanApplications: LoanApplication[] = [];
  private nextId: number = 1;
  private loanApplicationsSubject = new BehaviorSubject<LoanApplication[]>([]);
  public loanApplications$ = this.loanApplicationsSubject.asObservable();

  constructor() {
    console.log('LoanService initialized');
  }

  getLoanApplications(): LoanApplication[] {
    console.log('Getting loan applications:', this.loanApplications);
    return [...this.loanApplications];
  }

  addLoanApplication(loanApp: Omit<LoanApplication, 'no'>): void {
    const newLoanApp: LoanApplication = {
      no: this.nextId++,
      ...loanApp,
      interestRate: loanApp.interestRate || this.calculateInterestRate(loanApp.tenor)
    };

    console.log('Adding new loan application:', newLoanApp);
    this.loanApplications.push(newLoanApp);
    this.loanApplicationsSubject.next([...this.loanApplications]);
    console.log('Total loan applications now:', this.loanApplications.length);
  }

  private calculateInterestRate(tenor: number): number {
    if (tenor <= 12) return 8.5;
    if (tenor <= 24) return 9.5;
    if (tenor <= 36) return 10.5;
    return 11.5;
  }

  deleteLoanApplication(index: number): void {
    if (index >= 0 && index < this.loanApplications.length) {
      console.log('Deleting loan application at index:', index);
      this.loanApplications.splice(index, 1);
      this.loanApplicationsSubject.next([...this.loanApplications]);
    }
  }

  validateCreditScore(creditScore: number): boolean {
    return creditScore >= 60;
  }
}
