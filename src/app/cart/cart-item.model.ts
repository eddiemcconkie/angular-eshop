import { ShopItem } from '../shop/shop-item.model';

export class CartItem {
  constructor(
    public _id: string,
    public shopItem: ShopItem,
    public quantity: number
  ) {}
}
