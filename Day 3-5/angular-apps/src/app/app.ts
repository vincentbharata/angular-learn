import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit, AfterContentChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
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
import { LoanService } from './services/loan-service';

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
export class AppComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentChecked {
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

  private subscriptions = new Subscription();

  constructor(
    public crediturDataService: CrediturData,
    private loanService: LoanService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.setupRealTimeDataUpdates();
    this.loadLoanApplications();
    this.crediturDataService.refreshData();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.crediturDataService.refreshData();
    }, 0);
  }

  ngAfterContentChecked(): void {
    try {
      this.cdRef.markForCheck();
    } catch (e) {
      console.log('Ignored error in change detection', e);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  setupRealTimeDataUpdates(): void {
    const dataSubscription = this.crediturDataService.crediturList$.subscribe(data => {
      console.log('Received updated data from service:', data);
      this.parentData = data;
      this.cdRef.detectChanges();
    });
    this.subscriptions.add(dataSubscription);
  }

  loadCrediturData(): void {
    this.crediturDataService.refreshData();
    this.cdRef.detectChanges();
  }

  loadLoanApplications(): void {
    this.loanApplications = this.loanService.getLoanApplications();
  }

  onAddCreditur(newCreditur: kreditur): void {
    this.crediturDataService.addData(newCreditur).subscribe({
      next: () => {
        console.log('Data added successfully.');
        this.crediturDataService.refreshData();
        this.cdRef.detectChanges();
      },
      error: (error) => {
        console.error('Error adding credit data:', error);
      }
    });
  }

  onDeleteCreditur(index: number): void {
    this.crediturDataService.deleteData(index).subscribe({
      next: () => {
        console.log('Data deleted successfully');

        this.crediturDataService.refreshData();
       
        this.cdRef.detectChanges();
      },
      error: (error) => {
        console.error('Error deleting data:', error);
      }
    });
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
