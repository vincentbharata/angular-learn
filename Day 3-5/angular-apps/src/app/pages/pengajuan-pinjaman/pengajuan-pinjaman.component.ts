import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { kreditur } from '../../../model/creditur.interface';
import { LoanApplication } from '../../../model/loan-application.interface';
import { LoanForm } from '../../shared/loan/loan-form';
import { CreditScorePopup } from '../../shared/popup/credit-score-popup';
import { CrediturData } from '../../services/creditur-data';
import { LoanService } from '../../services/loan-service';

@Component({
  selector: 'app-pengajuan-pinjaman',
  standalone: true,
  imports: [CommonModule, RouterModule, LoanForm, CreditScorePopup],
  templateUrl: './pengajuan-pinjaman.component.html',
  styleUrls: ['./pengajuan-pinjaman.component.scss']
})
export class PengajuanPinjamanComponent implements OnInit, OnDestroy {
  parentData: kreditur[] = [];
  showCreditScorePopup: boolean = false;
  currentCreditScore: number = 0;
  requiredCreditScore: number = 60;
  private subscriptions = new Subscription();

  constructor(
    public crediturDataService: CrediturData,
    private loanService: LoanService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCrediturData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadCrediturData(): void {
    // First refresh data
    this.crediturDataService.refreshData();

    // Then subscribe to updates
    const dataSubscription = this.crediturDataService.crediturList$.subscribe(data => {
      this.parentData = [...data]; // Create new array for better performance
      console.log('Kreditur data loaded for pengajuan:', this.parentData);
    });
    this.subscriptions.add(dataSubscription);
  }

  onLoanApplicationSubmit(loanApp: Omit<LoanApplication, 'no'>): void {
    console.log('Submitting loan application:', loanApp);
    this.loanService.addLoanApplication(loanApp);
    console.log('Loan applications after submit:', this.loanService.getLoanApplications());
    // Navigate to daftar pinjaman after successful submission
    this.router.navigate(['/daftar-pinjaman']);
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
