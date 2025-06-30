import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { kreditur } from '../../../model/creditur.interface';
import { ListTable } from '../../shared/list/list-table';
import { CrediturData } from '../../services/creditur-data';
import { DeleteConfirmationPopup } from '../../shared/popup/delete-confirmation-popup';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ListTable, DeleteConfirmationPopup],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  parentData: kreditur[] = [];
  private subscriptions = new Subscription();

  // Delete confirmation popup properties
  showDeleteConfirmation = false;
  itemToDelete: { index: number; name: string } | null = null;

  constructor(
    public crediturDataService: CrediturData,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.setupRealTimeDataUpdates();
    this.crediturDataService.refreshData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  setupRealTimeDataUpdates(): void {
    const dataSubscription = this.crediturDataService.crediturList$.subscribe(data => {
      console.log('Received updated data from service:', data);
      this.parentData = [...data]; // Create new array to trigger change detection
      this.cdRef.detectChanges();
    });
    this.subscriptions.add(dataSubscription);
  }

  onDeleteCreditur(index: number): void {
    // Show delete confirmation popup instead of browser alert
    const krediturToDelete = this.parentData[index];
    if (krediturToDelete) {
      this.itemToDelete = {
        index: index,
        name: krediturToDelete.nama || 'item ini'
      };
      this.showDeleteConfirmation = true;
    }
  }

  onConfirmDelete(): void {
    if (this.itemToDelete) {
      this.crediturDataService.deleteData(this.itemToDelete.index).subscribe({
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
