import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/cart/cart-item.model';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cart: CartItem[] = [];
  cartTotal = 0;
  tax = 0.04;
  shipping = 3.5;
  orderPlaced = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartChanged.subscribe((cart) => {
      this.cart = cart;
      this.cartTotal = this.cartService.getTotal();
    });
  }

  updateCartItem(cartItemId: string, quantity: string) {
    this.cartService.setQuantity(cartItemId, Number.parseInt(quantity, 10));
  }

  removeCartItem(cartItemId: string) {
    this.cartService.removeFromCart(cartItemId);
  }

  placeOrder() {
    this.orderPlaced = true;
    this.cartService.clearCart();
  }
}
