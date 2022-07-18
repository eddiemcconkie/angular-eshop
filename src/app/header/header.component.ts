import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../account/account.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleCart = new EventEmitter<void>();

  cartSize: number = 0;
  displayName: string = '';

  constructor(
    private cartService: CartService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.cartService.cartChanged.subscribe((cart) => {
      this.cartSize = cart.length;
    });
    this.accountService.userChanged.subscribe((user) => {
      this.displayName = user?.name ?? '';
    });
  }

  onClickUserButton() {
    if (this.displayName) {
      this.accountService.signOut();
    } else {
      this.accountService.signIn();
    }
  }
}
