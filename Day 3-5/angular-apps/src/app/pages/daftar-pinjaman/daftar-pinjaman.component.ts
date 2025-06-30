import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoanApplication } from '../../../model/loan-application.interface';
import { LoanTable } from '../../shared/loan/loan-table';
import { LoanService } from '../../services/loan-service';
import { DeleteConfirmationPopup } from '../../shared/popup/delete-confirmation-popup';

@Component({
  selector: 'app-daftar-pinjaman',
  standalone: true,
  imports: [CommonModule, RouterModule, LoanTable, DeleteConfirmationPopup],
  templateUrl: './daftar-pinjaman.component.html',
  styleUrls: ['./daftar-pinjaman.component.scss']
})
export class DaftarPinjamanComponent implements OnInit, OnDestroy {
  loanApplications: LoanApplication[] = [];
  private subscriptions = new Subscription();

  // Delete confirmation popup properties
  showDeleteConfirmation = false;
  itemToDelete: { index: number; name: string } | null = null;

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loadLoanApplications();

    // Subscribe to loan applications updates
    const loanSubscription = this.loanService.loanApplications$.subscribe(applications => {
      console.log('Received loan applications update:', applications);
      this.loanApplications = [...applications];
    });
    this.subscriptions.add(loanSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadLoanApplications(): void {
    const newData = this.loanService.getLoanApplications();
    console.log('Loading loan applications:', newData);
    this.loanApplications = [...newData]; // Create new array for change detection
  }

  onDeleteLoanApplication(index: number): void {
    // Show delete confirmation popup instead of direct deletion
    const loanToDelete = this.loanApplications[index];
    if (loanToDelete) {
      this.itemToDelete = {
        index: index,
        name: loanToDelete.name || 'Pinjaman #' + (loanToDelete.no || (index + 1))
      };
      this.showDeleteConfirmation = true;
    }
  }

  onConfirmDelete(): void {
    if (this.itemToDelete) {
      console.log('Deleting loan application at index:', this.itemToDelete.index);
      this.loanService.deleteLoanApplication(this.itemToDelete.index);
      this.loadLoanApplications();
    }

    // Reset popup state
    this.showDeleteConfirmation = false;
    this.itemToDelete = null;
  }

  onCancelDelete(): void {
    // Reset popup state
    this.showDeleteConfirmation = false;
    this.itemToDelete = null;
  }
}
