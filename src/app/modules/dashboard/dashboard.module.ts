import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AddComponent } from './pages/add/add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard.component';
import { NftSingleCardComponent } from './components/nft/single-card/nft-single-card.component';
import { NftDualCardComponent } from './components/nft/dual-card/nft-dual-card.component';
import { NftChartCardComponent } from './components/nft/chart-card/nft-chart-card.component';

import { NgApexchartsModule } from 'ng-apexcharts';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NftHeaderComponent } from './components/nft/header/nft-header.component';
import { NftAuctionsTableComponent } from './components/nft/auctions-table/nft-auctions-table.component';
import { NftAuctionsTableItemComponent } from './components/nft/auctions-table-item/nft-auctions-table-item.component';
import { ListingComponent } from './pages/listing/listing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateCustomerComponent } from './pages/update-customer/update-customer.component';
import { DetailCustomerComponent } from './pages/detail-customer/detail-customer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PrincipaleComponent } from './pages/principale/principale.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AddComponent,
    NftSingleCardComponent,
    NftDualCardComponent,
    NftChartCardComponent,
    NftHeaderComponent,
    NftAuctionsTableComponent,
    NftAuctionsTableItemComponent,
    ListingComponent,
    UpdateCustomerComponent,
    DetailCustomerComponent,
    PrincipaleComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    HttpClientModule,
    NgApexchartsModule,
    AngularSvgIconModule.forRoot(),
    ReactiveFormsModule,
    NgxPaginationModule
  ],
})
export class DashboardModule {}
