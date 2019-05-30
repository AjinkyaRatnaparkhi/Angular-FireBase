import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { Subscription, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromApp from "../../app.reducer";
import { map } from "rxjs/operators";

@Component({
  selector: "app-sidenavlist",
  templateUrl: "./sidenavlist.component.html",
  styleUrls: ["./sidenavlist.component.css"]
})
export class SidenavlistComponent implements OnInit, OnDestroy {
  @Output() toggelEvent = new EventEmitter();
  isAuth$: Observable<boolean>;
  authSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<fromApp.State>
  ) {}

  ngOnInit() {
    // this.authSubscription = this.authService.authChange.subscribe(status => {
    //   this.isAuth = status;
    // });

    // use any of the below syntax
    this.isAuth$ = this.store.select(fromApp.getIsAuth);

    this.isAuth$ = this.store.pipe(map(state => state.auth.isAuthenticated));
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onToggel() {
    this.toggelEvent.emit();
  }

  logOut() {
    this.toggelEvent.emit();
    this.authService.logOut();
  }
}
