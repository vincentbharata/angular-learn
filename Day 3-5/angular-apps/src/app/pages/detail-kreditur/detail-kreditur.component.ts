import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { kreditur } from '../../../model/creditur.interface';
import { CrediturData } from '../../services/creditur-data';
import { DeleteConfirmationPopup } from '../../shared/popup/delete-confirmation-popup';

@Component({
  selector: 'app-detail-kreditur',
  standalone: true,
  imports: [CommonModule, RouterModule, DeleteConfirmationPopup],
  templateUrl: './detail-kreditur.component.html',
  styleUrls: ['./detail-kreditur.component.scss']
})
export class DetailKrediturComponent implements OnInit, OnDestroy {
  kreditur: kreditur | null = null;
  krediturIndex: number = -1;
  isLoading: boolean = true;
  notFound: boolean = false;
  showDeletePopup: boolean = false;
  private subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crediturDataService: CrediturData
  ) {}

  ngOnInit(): void {
    const routeSubscription = this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadKrediturDetail(id);
    });
    this.subscriptions.add(routeSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadKrediturDetail(index: number): void {
    this.isLoading = true;
    this.notFound = false;

    // First refresh data, then subscribe to get the latest data
    this.crediturDataService.refreshData();

    const dataSubscription = this.crediturDataService.crediturList$.subscribe(data => {
      console.log('Received data for detail:', data, 'Index:', index);
      if (data && data.length > index && index >= 0) {
        this.kreditur = data[index];
        this.krediturIndex = index;
        this.notFound = false;
        console.log('Found kreditur:', this.kreditur);
      } else {
        this.notFound = true;
        console.log('Kreditur not found. Data length:', data?.length, 'Index:', index);
      }
      this.isLoading = false;
    });
    this.subscriptions.add(dataSubscription);
  }

  onDeleteKreditur(): void {
    this.showDeletePopup = true;
  }

  onConfirmDelete(): void {
    if (this.krediturIndex >= 0) {
      this.crediturDataService.deleteData(this.krediturIndex).subscribe({
        next: () => {
          console.log('Data deleted successfully');
          this.showDeletePopup = false;
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error deleting data:', error);
          this.showDeletePopup = false;
        }
      });
    }
  }

  onCancelDelete(): void {
    this.showDeletePopup = false;
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
