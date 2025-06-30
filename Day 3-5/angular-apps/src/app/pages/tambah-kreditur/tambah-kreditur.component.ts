import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { kreditur } from '../../../model/creditur.interface';
import { ListForm } from '../../shared/list/list-form';
import { CrediturData } from '../../services/creditur-data';

@Component({
  selector: 'app-tambah-kreditur',
  standalone: true,
  imports: [CommonModule, RouterModule, ListForm],
  templateUrl: './tambah-kreditur.component.html',
  styleUrls: ['./tambah-kreditur.component.scss']
})
export class TambahKrediturComponent implements OnInit {

  constructor(
    public crediturDataService: CrediturData,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Component initialization
  }

  onAddCreditur(newCreditur: kreditur): void {
    this.crediturDataService.addData(newCreditur).subscribe({
      next: () => {
        console.log('Data added successfully.');
        this.crediturDataService.refreshData();
        this.cdRef.detectChanges();
        // Navigate back to home after successful addition
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error adding credit data:', error);
      }
    });
  }
}
