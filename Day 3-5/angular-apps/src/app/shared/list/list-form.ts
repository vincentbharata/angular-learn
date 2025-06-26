import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { kreditur } from '../../../model/creditur.interface';

@Component({
  selector: 'app-list-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './list-form.html',
  styleUrl: './list.scss'
})
export class ListForm {
  @Output() add = new EventEmitter<kreditur>();

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-Z\s]*$/)
    ]),
    age: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(120),
      Validators.pattern(/^\d+$/)
    ]),
    job: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ])
  });

  onSubmit() {
    if (this.form.valid) {
      this.add.emit({
        nama: this.form.value.name!,
        age: Number(this.form.value.age!),
        job: this.form.value.job!,
        creditScore: 0 
      });
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }

  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} wajib diisi`;
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `${this.getFieldDisplayName(fieldName)} minimal ${requiredLength} karakter`;
      }
      if (field.errors['pattern']) {
        if (fieldName === 'name') {
          return 'Nama hanya boleh berisi huruf dan spasi';
        }
        if (fieldName === 'age') {
          return 'Umur harus berupa angka';
        }
      }
      if (field.errors['min']) {
        return 'Umur minimal 1 tahun';
      }
      if (field.errors['max']) {
        return 'Umur maksimal 120 tahun';
      }
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      'name': 'Nama',
      'age': 'Umur',
      'job': 'Pekerjaan'
    };
    return displayNames[fieldName] || fieldName;
  }

  hasError(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field?.errors && field.touched);
  }
}
