import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { kreditur } from '../../../model/creditur.interface';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.html',
  standalone: true,
  styleUrl: './table.scss'
})
export class Table {
@Input() ChildrenData: kreditur[] = [];
@Output() buttonEmiter = new EventEmitter<string>();

SendToParrent(){
  this.buttonEmiter.emit('Data from child component');
}
}
