import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { kreditur } from '../../model/creditur.interface';
import { Api } from './api/api';

@Injectable({
  providedIn: 'root'
})
export class CrediturData {
  private crediturListSubject = new BehaviorSubject<kreditur[]>([]);
  public crediturList$ = this.crediturListSubject.asObservable();
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private api: Api) {
    this.loadDataFromLocalStorage();
    this.loadDataFromApi();
  }

  private loadDataFromLocalStorage(): void {
    const data = localStorage.getItem('crediturList');
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          this.crediturListSubject.next(parsed);
        }
      } catch (e) {
        console.error('Failed to parse kreditur data from localStorage', e);
      }
    }
  }

  private saveDataToLocalStorage(): void {
    const data = this.crediturListSubject.value;
    localStorage.setItem('crediturList', JSON.stringify(data));
  }

  private loadDataFromApi(): void {
    console.log('Loading data from API...');
    this.loadingSubject.next(true);

    this.api.getData().subscribe({
      next: (data) => {
        if (Array.isArray(data) && data.length > 0) {
          console.log('Data received from API:', data);
          this.crediturListSubject.next(data);
          this.saveDataToLocalStorage();
        } else {
          // Jika data dari API kosong, jangan timpa data localStorage
          console.warn('API returned empty data, keeping localStorage data');
        }
        this.loadingSubject.next(false);
      },
      error: (error) => {
        console.error('Error loading data from API:', error);
        // Jika error, tetap gunakan data localStorage
        this.loadingSubject.next(false);
      }
    });
  }

  private generateRandomCreditScore(): number {
    return Math.floor(Math.random() * 100) + 1;
  }

  getData(): kreditur[] {
    return [...this.crediturListSubject.value];
  }

  addData(newCreditur: kreditur): Observable<kreditur> {
    if (!newCreditur.creditScore) {
      newCreditur.creditScore = this.generateRandomCreditScore();
    }

    this.loadingSubject.next(true);

    return this.api.addData(newCreditur).pipe(
      tap((addedCreditur) => {
        const currentList = this.crediturListSubject.value;
        const updatedList = [...currentList, addedCreditur];
        this.crediturListSubject.next(updatedList);
        this.saveDataToLocalStorage();
        this.loadingSubject.next(false);
        console.log('Data added successfully:', addedCreditur);
        console.log('Updated list:', updatedList);
      })
    );
  }

  deleteData(index: number): Observable<any> {
    const currentList = this.crediturListSubject.value;
    if (index >= 0 && index < currentList.length) {
      const crediturToDelete = currentList[index];

      this.loadingSubject.next(true);

      if (crediturToDelete.id) {
        return this.api.deleteData(crediturToDelete.id).pipe(
          tap(() => {
            console.log('Data deleted from API, updating local list');
            const updatedList = currentList.filter((_, i) => i !== index);
            this.crediturListSubject.next(updatedList);
            this.saveDataToLocalStorage();
            this.loadingSubject.next(false);
          })
        );
      } else {
        const updatedList = currentList.filter((_, i) => i !== index);
        this.crediturListSubject.next(updatedList);
        this.saveDataToLocalStorage();
        this.loadingSubject.next(false);
        return new Observable(observer => {
          observer.next({success: true});
          observer.complete();
        });
      }
    }

    return new Observable(observer => {
      observer.error(new Error('Invalid index for deletion'));
      observer.complete();
    });
  }

  getDataLength(): number {
    return this.crediturListSubject.value.length;
  }

  getCrediturByName(nama: string): kreditur | undefined {
    return this.crediturListSubject.value.find(creditur => creditur.nama === nama);
  }

  refreshData(): void {
    console.log('Manual refresh requested');
    // Saat refresh, coba load dari localStorage dulu, baru dari API
    this.loadDataFromApi();
  }
}
