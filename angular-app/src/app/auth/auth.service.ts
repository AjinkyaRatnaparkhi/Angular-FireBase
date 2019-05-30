import { UserModel } from "./user.model";
import { AuthData } from "./auth.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { TrainingService } from "../training/training.service";
import { MatSnackBar } from "@angular/material";
import { UIService } from "../shared/ui.service";
import { Store } from "@ngrx/store";
import * as fromApp from "../app.reducer";
import * as UI from "../shared/ui.actions";
import * as AUTH from "./auth.actions";

@Injectable()
export class AuthService {
  private user: UserModel;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private matSnackBar: MatSnackBar,
    private uiService: UIService,
    private store: Store<fromApp.State>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new AUTH.SetAuthenticated());
        //this.authChange.next(true);

        this.router.navigate(["/training"]);
      } else {
        this.trainingService.cancelSubscriptions();

        this.store.dispatch(new AUTH.SetUnauthenticated());
        this.router.navigate(["/login"]);
      }
    });
  }

  registerUser(authData: AuthData) {
    // this.uiService.loading.next(true);

    // dispatching the action , which is handeled by appReducer
    this.store.dispatch(new UI.StartLoading());

    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        //this.uiService.loading.next(false);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        // console.log(error);
        //  this.uiService.loading.next(false);
        this.store.dispatch(new UI.StopLoading());

        this.matSnackBar.open(error.message, null, {
          duration: 3000
        });
      });
  }



  loginUser(authData: AuthData) {
    // this.uiService.loading.next(true);

    // dispatching the action , which is handeled by appReducer
    this.store.dispatch(new UI.StartLoading());

    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        //  this.uiService.loading.next(false);
        this.store.dispatch(new UI.StopLoading());

      })
      .catch(error => {
        //this.uiService.loading.next(false);

        this.store.dispatch(new UI.StopLoading());

        //console.log(error);
        this.matSnackBar.open(error.message, null, {
          duration: 3000
        });
      });
  }

  logOut() {
    this.afAuth.auth.signOut();
  }
}
