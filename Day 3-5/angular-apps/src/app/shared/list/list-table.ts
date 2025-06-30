import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { kreditur } from '../../../model/creditur.interface';

@Component({
  selector: 'app-list-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-table.html',
  styleUrl: './list.scss'
})
export class ListTable {
  @Input() data: kreditur[] = [];
  @Output() delete = new EventEmitter<number>();

  onDelete(idx: number) {
    this.delete.emit(idx);
  }
}
