import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
 
  {path:'signup' , component: SignupComponent},
  {path:'' , component: HomeComponent},
  {path:'login' , component: LoginComponent},
  {path:'training', component: TrainingComponent , canActivate: [AuthGuard]},
  {path:'not-found' , component: PageNotFoundComponent},
  {path:'**' , redirectTo:'not-found'}
  ]
  

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
