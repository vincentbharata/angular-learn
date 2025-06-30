import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-confirmation-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-confirmation-popup.html',
  styleUrl: './delete-confirmation-popup.scss'
})
export class DeleteConfirmationPopup {
  @Input() isVisible: boolean = false;
  @Input() itemName: string = '';
  @Input() itemType: string = 'item';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onCancel();
    }
  }
}
