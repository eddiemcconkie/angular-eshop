import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { AccountService } from './account/account.service';
import { CartService } from './cart/cart.service';
import { ShopService } from './shop/shop.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private shopService: ShopService,
    private cartService: CartService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.shopService.init();
    this.cartService.init();
    this.accountService.signIn();
  }
}
