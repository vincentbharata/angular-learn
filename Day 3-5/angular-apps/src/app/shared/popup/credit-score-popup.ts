import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-credit-score-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './credit-score-popup.html',
  styleUrl: './credit-score-popup.scss'
})
export class CreditScorePopup {
  @Input() isVisible: boolean = false;
  @Input() currentScore: number = 0;
  @Input() requiredScore: number = 60;
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }
}
