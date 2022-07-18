import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShopItem } from './shop-item.model';
import { ShopService } from './shop.service';

@Injectable({
  providedIn: 'root',
})
export class ShopItemResolverService implements Resolve<ShopItem> {
  constructor(private shopService: ShopService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): ShopItem | Observable<ShopItem> | Promise<ShopItem> {
    return this.shopService
      .getItem(route.params['shopItemId'])
      .pipe(map((obj) => obj.item));
  }
}
