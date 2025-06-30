import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { LoanApplication } from '../../../model/loan-application.interface';
import { LoanService } from '../../services/loan-service';
import { DeleteConfirmationPopup } from '../../shared/popup/delete-confirmation-popup';

@Component({
  selector: 'app-detail-pinjaman',
  standalone: true,
  imports: [CommonModule, RouterModule, DeleteConfirmationPopup],
  templateUrl: './detail-pinjaman.component.html',
  styleUrls: ['./detail-pinjaman.component.scss']
})
export class DetailPinjamanComponent implements OnInit {
  loanApplication: LoanApplication | null = null;
  loanIndex: number = -1;
  isLoading: boolean = true;
  notFound: boolean = false;
  showDeletePopup: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loanService: LoanService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadLoanDetail(id);
    });
  }

  loadLoanDetail(index: number): void {
    const loanApplications = this.loanService.getLoanApplications();
    if (loanApplications && loanApplications.length > index && index >= 0) {
      this.loanApplication = loanApplications[index];
      this.loanIndex = index;
      this.notFound = false;
    } else {
      this.notFound = true;
    }
    this.isLoading = false;
  }

  onDeleteLoan(): void {
    this.showDeletePopup = true;
  }

  onConfirmDelete(): void {
    if (this.loanIndex >= 0) {
      this.loanService.deleteLoanApplication(this.loanIndex);
      this.showDeletePopup = false;
      this.router.navigate(['/daftar-pinjaman']);
    }
  }

  onCancelDelete(): void {
    this.showDeletePopup = false;
  }

  goBack(): void {
    this.router.navigate(['/daftar-pinjaman']);
  }
}
