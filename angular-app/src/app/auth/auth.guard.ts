import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";

import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Store } from "@ngrx/store";
import * as fromApp from "../app.reducer";
import { map } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService , private store: Store<fromApp.State>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
      return this.store.select(fromApp.getIsAuth);
  }
}
