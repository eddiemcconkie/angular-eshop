import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartItem } from '../cart-item.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.scss'],
})
export class CartSidebarComponent implements OnInit {
  @Output() closeCart = new EventEmitter<void>();
  cart: CartItem[] = [];
  cartTotal = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartTotal = this.cartService.getTotal();
    this.cartService.cartChanged.subscribe((cart) => {
      this.cart = cart;
      this.cartTotal = this.cartService.getTotal();
    });
  }
}
