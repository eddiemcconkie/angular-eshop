import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './shop/checkout/checkout.component';
import { ShopHomeComponent } from './shop/shop-home/shop-home.component';
import { ShopItemDetailsComponent } from './shop/shop-item-details/shop-item-details.component';
import { ShopItemResolverService } from './shop/shop-item-resolver.service';

const routes: Routes = [
  { path: '', component: ShopHomeComponent },
  { path: 'checkout', component: CheckoutComponent },
  {
    path: ':shopItemId',
    component: ShopItemDetailsComponent,
    resolve: { shopItem: ShopItemResolverService },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
