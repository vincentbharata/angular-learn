import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Animal } from '../model/animate.interface';
import { kreditur } from '../model/creditur.interface';
import { LoanApplication } from '../model/loan-application.interface';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ListForm } from './shared/list/list-form';
import { ListTable } from './shared/list/list-table';
import { LoanForm } from './shared/loan/loan-form';
import { LoanTable } from './shared/loan/loan-table';
import { CreditScorePopup } from './shared/popup/credit-score-popup';
import { CrediturData } from './services/creditur-data';
import { LoanService } from './services/loan.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ListForm,
    ListTable,
    LoanForm,
    LoanTable,
    CreditScorePopup,
  ],
  providers: [CrediturData, LoanService],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent implements OnInit {
  title: string = 'fif-june-angular';
  testVariable: string = 'something';
  anotherVariabel: string = 'value pertama';
  isApproved: boolean = true;
  dp: number = 0;
  testFromChild: string = '';
  imgUrl: string = 'https://picsum.photos/200/300';
  name: string = '';
  // kreditur data
  parentData: kreditur[] = [];

  // loan application data
  loanApplications: LoanApplication[] = [];

  // popup state
  showCreditScorePopup: boolean = false;
  currentCreditScore: number = 0;
  requiredCreditScore: number = 60;

  constructor(
    private crediturDataService: CrediturData,
    private loanService: LoanService
  ) {}

  ngOnInit(): void {
    this.loadCrediturData();
    this.loadLoanApplications();
  }

  loadCrediturData(): void {
    this.parentData = this.crediturDataService.getData();
  }

  loadLoanApplications(): void {
    this.loanApplications = this.loanService.getLoanApplications();
  }

  onAddCreditur(newCreditur: kreditur): void {
    this.crediturDataService.addData(newCreditur);
    this.loadCrediturData();
  }

  onDeleteCreditur(index: number): void {
    this.crediturDataService.deleteData(index);
    this.loadCrediturData();
  }

  onLoanApplicationSubmit(loanApp: Omit<LoanApplication, 'no'>): void {
    this.loanService.addLoanApplication(loanApp);
    this.loadLoanApplications();
  }

  onDeleteLoanApplication(index: number): void {
    this.loanService.deleteLoanApplication(index);
    this.loadLoanApplications();
  }

  onCreditScoreError(errorData: {currentScore: number, requiredScore: number}): void {
    this.currentCreditScore = errorData.currentScore;
    this.requiredCreditScore = errorData.requiredScore;
    this.showCreditScorePopup = true;
  }

  onClosePopup(): void {
    this.showCreditScorePopup = false;
  }
}
