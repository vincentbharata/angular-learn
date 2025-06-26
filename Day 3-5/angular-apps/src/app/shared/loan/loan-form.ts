import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { kreditur } from '../../../model/creditur.interface';
import { LoanApplication } from '../../../model/loan-application.interface';

@Component({
  selector: 'app-loan-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './loan-form.html',
  styleUrl: '../list/list.scss'
})
export class LoanForm {
  @Input() crediturList: kreditur[] = [];
  @Output() loanApplicationSubmit = new EventEmitter<Omit<LoanApplication, 'no'>>();
  @Output() creditScoreError = new EventEmitter<{currentScore: number, requiredScore: number}>();

  tenorOptions = [12, 24, 36, 48];

  loanForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    amount: new FormControl(0, [Validators.required, Validators.min(1)]),
    tenor: new FormControl(12, [Validators.required])
  });

  onSubmit(): void {
    if (this.loanForm.valid) {
      const selectedName = this.loanForm.value.name!;
      const selectedCreditur = this.crediturList.find(c => c.nama === selectedName);

      if (selectedCreditur && selectedCreditur.creditScore < 60) {
        this.creditScoreError.emit({
          currentScore: selectedCreditur.creditScore,
          requiredScore: 60
        });
        return;
      }

      const loanApplication: Omit<LoanApplication, 'no'> = {
        name: selectedName,
        amount: this.loanForm.value.amount!,
        tenor: this.loanForm.value.tenor!
      };

      this.loanApplicationSubmit.emit(loanApplication);
      this.loanForm.reset();
      this.loanForm.patchValue({ tenor: 12 });
    }
  }
}
