import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { AccountService } from '../account/account.service';
import { CartItem } from './cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: CartItem[] = [];
  cartChanged = new ReplaySubject<CartItem[]>();
  userId: string | null = null;

  constructor(
    private accountService: AccountService,
    private http: HttpClient
  ) {}

  init() {
    this.accountService.userChanged.subscribe((user) => {
      if (user) {
        this.userId = user._id;
        this.http
          .get<{ cart: CartItem[] }>(
            `http://localhost:8000/users/${this.userId}/cart`
          )
          .subscribe(({ cart }) => {
            this.cart = cart;
            this.cartChanged.next(cart);
          });
      } else {
        this.cart = [];
        this.cartChanged.next([]);
        this.userId = null;
      }
    });
  }

  addItemToCart(shopItemId: string, quantity: number) {
    if (this.userId) {
      if (this.hasItem(shopItemId)) {
        const index = this.cart.findIndex(
          (cartItem) => cartItem.shopItem._id === shopItemId
        );
        const previousQuantity = this.cart[index].quantity;

        this.http
          .put<{ cartItem: CartItem }>(
            `http://localhost:8000/cart/${this.cart[index]._id}`,
            { quantity: previousQuantity + quantity }
          )
          .subscribe(({ cartItem }) => {
            if (cartItem) {
              this.cart.splice(index, 1, cartItem);
              this.cartChanged.next(this.cart);
            }
          });
      } else {
        this.http
          .post<{ cartItem: CartItem }>(
            `http://localhost:8000/users/${this.userId}/cart`,
            { shopItemId, quantity }
          )
          .subscribe(({ cartItem }) => {
            if (cartItem) {
              this.cart.push(cartItem);
              this.cartChanged.next(this.cart);
            }
          });
      }
    }
  }

  setQuantity(cartItemId: string, quantity: number) {
    const index = this.cart.findIndex(
      (cartItem) => cartItem._id === cartItemId
    );

    this.http
      .put<{ cartItem: CartItem }>(
        `http://localhost:8000/cart/${this.cart[index]._id}`,
        { quantity: quantity }
      )
      .subscribe(({ cartItem }) => {
        if (cartItem) {
          this.cart.splice(index, 1, cartItem);
          this.cartChanged.next(this.cart);
        }
      });
  }

  removeFromCart(cartItemId: string) {
    const index = this.cart.findIndex(
      (cartItem) => cartItem._id === cartItemId
    );

    this.http
      .delete(`http://localhost:8000/cart/${cartItemId}`)
      .subscribe(() => {
        this.cart.splice(index, 1);
        this.cartChanged.next(this.cart);
      });
  }

  clearCart() {
    for (const cartItem of this.cart) {
      this.removeFromCart(cartItem._id);
    }
  }

  getTotal() {
    return this.cart.reduce<number>((total: number, cartItem: CartItem) => {
      const quantity = cartItem.quantity;
      const price = cartItem.shopItem.price;
      return total + quantity * price;
    }, 0);
  }

  private hasItem(shopItemId: string): boolean {
    return (
      this.cart.findIndex((cartItem) => cartItem.shopItem._id === shopItemId) >=
      0
    );
  }
}
