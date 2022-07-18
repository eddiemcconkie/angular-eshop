import { CartItem } from '../cart/cart-item.model';

export class User {
  constructor(
    public _id: string,
    public name: string,
    public username: string,
    public password: string,
    // public cart: CartItem[]
    public cartId: string
  ) {}
}
