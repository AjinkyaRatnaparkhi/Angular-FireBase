import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { UIService } from "src/app/shared/ui.service";
import { Subscription, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromApp from "../../app.reducer";
import { map } from 'rxjs/operators';


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<fromApp.State>
  ) {}

  isLoading$: Observable<boolean>;
  // loadingSub: Subscription;

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.required, Validators.minLength(5)]]
    });

    // this.loadingSub = this.uiService.loading.subscribe(isLoading => {
    //   this.isLoading = isLoading;
    // })

     // this.isLoading$ = this.store.select(fromApp.getIsLoading);
     // this is norml way of getting the state 
     this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));

     // below method uses feature & selectors defined in app reducer 
     // this.isLoading$ = this.store.select(fromApp.getIsLoading);
  }

  onSubmit() {
    console.log(this.loginForm);

    this.authService.loginUser({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

}
