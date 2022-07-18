import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ShopItem } from './shop-item.model';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private _shopItems: ShopItem[] = [];
  set shopItems(items: ShopItem[]) {
    this._shopItems = items;
    this.shopItemsChanged.next(items);
  }
  shopItemsChanged = new Subject<ShopItem[]>();

  constructor(private http: HttpClient) {}

  init() {
    this.http
      .get<{ items: ShopItem[] }>('http://localhost:8000/shop')
      .subscribe(({ items }) => {
        this.shopItems = items;
      });
  }

  getItem(id: string) {
    return this.http.get<{ item: ShopItem }>(
      `http://localhost:8000/shop/${id}`
    );
  }
}
