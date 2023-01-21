import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'transaction',
    loadChildren: () =>
      import('./modules/transaction/transaction.module').then(
        (m) => m.TransactionModule
      ),
  },
  {
    path: 'operation',
    loadChildren: () =>
      import('./modules/operation/operation.module').then(
        (m) => m.OperationModule
      ),
  },
  {
    path: 'bags',
    loadChildren: () =>
      import('./modules/bags/bags.module').then((m) => m.BagsModule),
  },
  {
    path: 'bags-lawyer',
    loadChildren: () =>
      import('./modules/bags-lawyer/bags-lawyer.module').then(
        (m) => m.BagsLawyerModule
      ),
  },
  {
    path: 'lawyer-account',
    loadChildren: () =>
      import('./modules/lawyer/lawyer.module').then(
        (m) => m.LawyerModule
      ),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./modules/shared/shared.module').then((m) => m.SharedModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
