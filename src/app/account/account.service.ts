import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  userChanged: Subject<User | null> = new Subject();
  private _user: User | null = null;
  private set user(u: User | null) {
    this._user = u;
    // this.userChanged.next(u);
  }
  private get user() {
    return this._user;
  }

  constructor(private http: HttpClient) {}

  getAccounts() {
    return this.http.get<{ users: User[] }>('http://localhost:8000/users');
  }

  signIn(userId: string = '62ca104e02a9b4a51d303360') {
    this.http
      .get<{ user: User }>('http://localhost:8000/users/' + userId)
      .subscribe(({ user }) => {
        if (user) {
          this.user = user;
          this.userChanged.next(user);
        }
      });
  }

  signOut() {
    this.userChanged.next(null);
  }

  loggedIn(): boolean {
    return this.user !== null;
  }
}
