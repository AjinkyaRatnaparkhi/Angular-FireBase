import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { Subscription, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromApp from "../../app.reducer";
import { map } from "rxjs/operators";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggelEvent = new EventEmitter();
  isAuth$: Observable<boolean>;
  authSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<fromApp.State>
  ) {}

  ngOnInit() {
    // this.authSubscription = this.authService.authChange.subscribe(status => {
    //   this.isAuth = status;
    // });

    // use any of the below syntax
    // this.isAuth$ = this.store.select(fromApp.getIsAuth);

    this.isAuth$ = this.store.pipe(map(state => state.auth.isAuthenticated));
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onToggel() {
    this.toggelEvent.emit();
  }

  goHome() {
    this.router.navigate(["/"]);
  }

  logOut() {
    this.authService.logOut();
  }
}
