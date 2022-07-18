import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from './header/header.component';
import { CartSidebarComponent } from './cart/cart-sidebar/cart-sidebar.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { ShopHomeComponent } from './shop/shop-home/shop-home.component';
import { CurrencyPipe } from './shared/currency.pipe';
import { ShopItemDetailsComponent } from './shop/shop-item-details/shop-item-details.component';
import { FormsModule } from '@angular/forms';
import { RatingComponent } from './shop/rating/rating.component';
import { CheckoutComponent } from './shop/checkout/checkout.component';
const MaterialModules = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule,
  MatBadgeModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartSidebarComponent,
    CartItemComponent,
    ShopHomeComponent,
    CurrencyPipe,
    ShopItemDetailsComponent,
    RatingComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ...MaterialModules,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
