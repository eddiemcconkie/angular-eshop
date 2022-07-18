import { TestBed } from '@angular/core/testing';

import { ShopItemResolverService } from './shop-item-resolver.service';

describe('ShopItemResolverService', () => {
  let service: ShopItemResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopItemResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
