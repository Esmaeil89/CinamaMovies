import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './Account/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './Account/register/register.component';
import { FooterMenuComponent } from './footer-menu/footer-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterConfirmComponent } from './Account/register-confirm/register-confirm.component';
import { ForgetPasswordComponent } from './Account/forget-password/forget-password.component';
import { PasswordConfirmComponent } from './Account/password-confirm/password-confirm.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { UsersComponent } from './Admin/users/users.component';
import { AddUserComponent } from './Admin/add-user/add-user.component';
import { UserRolesComponent } from './Admin/user-roles/user-roles.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditUserRoleComponent } from './Admin/edit-user-role/edit-user-role.component';
import { CategoryListComponent } from './Admin/Categories/category-list/category-list.component';
import { AddCategoryComponent } from './Admin/Categories/add-category/add-category.component';
import { SubCategoryListComponent } from './Admin/SubCategories/sub-category-list/sub-category-list.component';
import { SubCategoryComponent } from './Admin/SubCategories/sub-category/sub-category.component';
import { ActorListComponent } from './Admin/Actors/actor-list/actor-list.component';
import { AddActorComponent } from './Admin/Actors/add-actor/add-actor.component';
import { MoviesListComponent } from './Admin/Movies/movies-list/movies-list.component';
import { AddMovieComponent } from './Admin/Movies/add-movie/add-movie.component';
import { EditMovieComponent } from './Admin/Movies/edit-movie/edit-movie.component';
import { EditActorsComponent } from './Admin/Movies/edit-actors/edit-actors.component';
import { EditLinksComponent } from './Admin/Movies/edit-links/edit-links.component';
import { MovieLinkListComponent } from './Admin/MovieLinks/movie-link-list/movie-link-list.component';
import { EditMovieLinkComponent } from './Admin/MovieLinks/edit-movie-link/edit-movie-link.component';
import { MovieActorListComponent } from './Admin/MovieActors/movie-actor-list/movie-actor-list.component';
import { EditMovieActorComponent } from './Admin/MovieActors/edit-movie-actor/edit-movie-actor.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    FooterMenuComponent,
    RegisterConfirmComponent,
    ForgetPasswordComponent,
    PasswordConfirmComponent,
    DashboardComponent,
    UsersComponent,
    AddUserComponent,
    UserRolesComponent,
    AccessDeniedComponent,
    NotFoundComponent,
    EditUserRoleComponent,
    CategoryListComponent,
    AddCategoryComponent,
    SubCategoryListComponent,
    SubCategoryComponent,
    ActorListComponent,
    AddActorComponent,
    MoviesListComponent,
    AddMovieComponent,
    EditMovieComponent,
    EditActorsComponent,
    EditLinksComponent,
    MovieLinkListComponent,
    EditMovieLinkComponent,
    MovieActorListComponent,
    EditMovieActorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
