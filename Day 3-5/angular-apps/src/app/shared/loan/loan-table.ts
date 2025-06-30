import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoanApplication } from '../../../model/loan-application.interface';

@Component({
  selector: 'app-loan-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './loan-table.html',
  styleUrl: '../list/list.scss'
})
export class LoanTable {
  @Input() loanApplications: LoanApplication[] = [];
  @Output() delete = new EventEmitter<number>();

  onDelete(idx: number) {
    this.delete.emit(idx);
  }
}
