import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { UIService } from "src/app/shared/ui.service";
import { Subscription, Observable } from "rxjs";
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  isLoading$ : Observable<boolean>;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<fromApp.State>
  ) {}

  ngOnInit() {
    this.signUpForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(5)]],
      date: [new Date()],
      agree: [false]
    });
   
    //  variables managed by ngRx are appended with $ sign
    
     // this is norml way of getting the state 
     // this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));

     // below method uses feature & selectors defined in app reducer 
      this.isLoading$ = this.store.select(fromApp.getIsLoading);

  }

  onSubmit() {
    console.log(this.signUpForm);

    this.authService.registerUser({
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password
    });
  }

}
