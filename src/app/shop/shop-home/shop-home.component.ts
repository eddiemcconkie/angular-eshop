import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { ShopItem } from '../shop-item.model';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-shop-home',
  templateUrl: './shop-home.component.html',
  styleUrls: ['./shop-home.component.scss'],
})
export class ShopHomeComponent implements OnInit {
  shopItems: ShopItem[] = [];

  // constructor(private shopService: ShopService) {}
  constructor(
    private shopService: ShopService,
    private cartService: CartService
  ) {}

  // ngOnInit(): void {
  // }

  ngOnInit(): void {
    this.shopService.init();
    this.cartService.init();
    this.shopService.shopItemsChanged.subscribe((shopItems) => {
      this.shopItems = shopItems;
    });
  }
}
