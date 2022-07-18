import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { CartService } from 'src/app/cart/cart.service';
import { ShopItem } from '../shop-item.model';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-shop-item-details',
  templateUrl: './shop-item-details.component.html',
  styleUrls: ['./shop-item-details.component.scss'],
})
export class ShopItemDetailsComponent implements OnInit {
  shopItem: ShopItem | null = null;
  quantity = 1;

  constructor(
    private cartService: CartService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ shopItem }) => {
      this.shopItem = shopItem;
    });
  }

  addToCart() {
    if (this.accountService.loggedIn()) {
      if (this.shopItem) {
        this.cartService.addItemToCart(this.shopItem._id, this.quantity);
      }
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
