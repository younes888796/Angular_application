import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DetailCustomerComponent } from './pages/detail-customer/detail-customer.component';
import { ListingComponent } from './pages/listing/listing.component';
import { AddComponent } from './pages/add/add.component';
import { PrincipaleComponent } from './pages/principale/principale.component';
import { UpdateCustomerComponent } from './pages/update-customer/update-customer.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'listing', pathMatch: 'full' },
      { path: 'nfts', component: AddComponent },
      { path: 'listing', component: ListingComponent },
      { path: 'update-customer/:id', component: UpdateCustomerComponent },
      { path: 'detail-customer/:id', component: DetailCustomerComponent },
      { path: 'principale', component: PrincipaleComponent },


      { path: '**', redirectTo: 'error/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
