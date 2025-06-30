import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'tambah-kreditur',
        loadComponent: () => import('./pages/tambah-kreditur/tambah-kreditur.component').then(m => m.TambahKrediturComponent)
      },
      {
        path: 'pengajuan-pinjaman',
        loadComponent: () => import('./pages/pengajuan-pinjaman/pengajuan-pinjaman.component').then(m => m.PengajuanPinjamanComponent)
      },
      {
        path: 'daftar-pinjaman',
        loadComponent: () => import('./pages/daftar-pinjaman/daftar-pinjaman.component').then(m => m.DaftarPinjamanComponent)
      },
      {
        path: 'detail-kreditur/:id',
        loadComponent: () => import('./pages/detail-kreditur/detail-kreditur.component').then(m => m.DetailKrediturComponent)
      },
      {
        path: 'detail-pinjaman/:id',
        loadComponent: () => import('./pages/detail-pinjaman/detail-pinjaman.component').then(m => m.DetailPinjamanComponent)
      }
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

