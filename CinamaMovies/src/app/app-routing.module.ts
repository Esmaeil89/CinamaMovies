import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Account/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './Account/register/register.component';
import { RegisterConfirmComponent } from './Account/register-confirm/register-confirm.component';
import { ForgetPasswordComponent } from './Account/forget-password/forget-password.component';
import { PasswordConfirmComponent } from './Account/password-confirm/password-confirm.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { UsersComponent } from './Admin/users/users.component';
import { DashboardGaurdService } from './gaurds/dashboard-gaurd.service';
import { AddUserComponent } from './Admin/add-user/add-user.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { EditUserRoleComponent } from './Admin/edit-user-role/edit-user-role.component';
import { AddCategoryComponent } from './Admin/Categories/add-category/add-category.component';
import { SubCategoryComponent } from './Admin/SubCategories/sub-category/sub-category.component';
import { AddActorComponent } from './Admin/Actors/add-actor/add-actor.component';
import { AddMovieComponent } from './Admin/Movies/add-movie/add-movie.component';
import { EditMovieComponent } from './Admin/Movies/edit-movie/edit-movie.component';
import { EditLinksComponent } from './Admin/Movies/edit-links/edit-links.component';
import { EditActorsComponent } from './Admin/Movies/edit-actors/edit-actors.component';
import { EditMovieLinkComponent } from './Admin/MovieLinks/edit-movie-link/edit-movie-link.component';
import { EditMovieActorComponent } from './Admin/MovieActors/edit-movie-actor/edit-movie-actor.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registerconfirm', component: RegisterConfirmComponent},
  {path: 'forgetpassword', component: ForgetPasswordComponent},
  {path: 'passwordconfirm', component: PasswordConfirmComponent},
  {path: 'controlpanel', component: DashboardComponent},
  {path: 'usersList', component: UsersComponent},
  { path: 'controlpanel', component: DashboardComponent, canActivate: [DashboardGaurdService] },
  { path: 'edituser/:id', component: AddUserComponent },
  { path: 'notfound', component: NotFoundComponent },
  { path: 'accessdenied', component: AccessDeniedComponent },
  { path: 'edituserrole/:id/:id1', component: EditUserRoleComponent },
  { path: 'category', component: AddCategoryComponent },
  { path: 'editcategory/:id/:id1', component: AddCategoryComponent },
  { path: 'subcategory', component: SubCategoryComponent },
  { path: 'editsubcategory/:id/:id1/:id2', component: SubCategoryComponent },
  { path: 'addactor', component: AddActorComponent },
  { path: 'editactor/:id', component: AddActorComponent },
  { path: 'addmovie', component: AddMovieComponent },
  { path: 'editmovie/:id', component: EditMovieComponent },
  { path: 'editlinks/:id', component: EditMovieLinkComponent },
  { path: 'addlink', component: EditMovieLinkComponent },
  { path: 'editmovieactor/:id', component: EditMovieActorComponent },
  { path: 'addmovieactor', component: EditMovieActorComponent },
  //{ path: 'getmovie/:id', component: MovieDetailsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
