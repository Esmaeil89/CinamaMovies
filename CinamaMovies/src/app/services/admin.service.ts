import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actor } from '../Models/Actor';
import { Category } from '../Models/CategoryModel';
import { EditUserModel } from '../Models/EditUserModel';
import { EditUserRoleModel } from '../Models/EditUserRoleModel';
import { Movie } from '../Models/Movie';
import { MovieActor } from '../Models/MovieActor';
import { MovieLink } from '../Models/MovieLink';
import { RoleModel } from '../Models/RoleModel';
import { SubCategory } from '../Models/SubCatgory';
import { Users } from '../Models/User';
import { UserModel } from '../Models/UserModel';
import { UserRoleModel } from '../Models/UserRoleModel';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient) { }
  baseUrl= 'http://localhost:25771/api/Admin/';
  headers={
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials : true
  }

   GetAllUsers(): Observable<Users[]>{
     return this.http.get<Users[]>(this.baseUrl+ 'GetAllUsers', this.headers).pipe()
   }

  AddUser(model: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.baseUrl + 'AddUser', model, this.headers).pipe();
  }

  GetUser(id: string): Observable<Users> {
    return this.http.get<Users>(this.baseUrl + 'GetUser/' + id, this.headers).pipe();
  }

  EditUser(model: EditUserModel): Observable<Users> {
    return this.http.put<Users>(this.baseUrl + 'EditUser', model, this.headers).pipe();
  }

  DeleteAll(ids: string[]) {
    return this.http.post(this.baseUrl + 'DeleteUsers', ids, this.headers).pipe();
  }

  GetUserRoles(): Observable<UserRoleModel[]> {
    return this.http.get<UserRoleModel[]>(this.baseUrl + 'GetUserRoles', this.headers).pipe();
  }


  GelAllRoles(): Observable<RoleModel[]> {
    return this.http.get<RoleModel[]>(this.baseUrl + 'GetAllRoles', this.headers).pipe();
  }

  EditUserRole(model: EditUserRoleModel): Observable<EditUserRoleModel> {
    return this.http.put<EditUserRoleModel>(this.baseUrl + 'EditUserRole', model, this.headers).pipe();
  }

  GetAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + 'GetCategories', this.headers).pipe();
  }

  AddCategory(model: Category): Observable<Category> {
    return this.http.post<Category>(this.baseUrl + 'AddCategory', model, this.headers).pipe();
  }

  EditCategory(model: Category): Observable<Category> {
    return this.http.put<Category>(this.baseUrl + 'EditCategory', model, this.headers).pipe();
  }

  DeleteAllCategory(ids: string[]) {
    return this.http.post(this.baseUrl + 'DeleteCategories', ids, this.headers).pipe();
  }

  GetAllSubCategories(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(this.baseUrl + 'GetSubCategories', this.headers).pipe();
  }

  AddSubCategory(model: SubCategory): Observable<SubCategory> {
    return this.http.post<SubCategory>(this.baseUrl + 'AddSubCategory', model, this.headers).pipe();
  }

  EditSubCategory(model: SubCategory): Observable<SubCategory> {
    return this.http.put<SubCategory>(this.baseUrl + 'EditSubCategory', model, this.headers).pipe();
  }

  DeleteAllSubCategory(ids: string[]) {
    return this.http.post(this.baseUrl + 'DeleteSubCategories', ids, this.headers).pipe();
  }

  GetAllActors(): Observable<Actor[]> {
    return this.http.get<Actor[]>(this.baseUrl + 'GetActors', this.headers).pipe();
  }

  AddActor(formData: FormData) {
    return this.http.post(this.baseUrl + 'AddActor', formData, { withCredentials: true }).pipe();
  }

  GetActor(id: number): Observable<Actor> {
    return this.http.get<Actor>(this.baseUrl + 'GetActor/' + id, this.headers).pipe();
  }

  EditActor(formData: FormData) {
    return this.http.put(this.baseUrl + 'EditActor', formData, { withCredentials: true }).pipe();
  }

  DeleteAllActors(ids: string[]) {
    return this.http.post(this.baseUrl + 'DeleteActors', ids, this.headers).pipe();
  }

  GetAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.baseUrl + 'GetMovies', this.headers).pipe();
  }

  AddMovie(fd: FormData) {
    return this.http.post(this.baseUrl + 'AddMovie', fd, { withCredentials: true }).pipe();
  }

  GetMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(this.baseUrl + 'GetMovie/' + id, this.headers).pipe();
  }

  EditMovie(fd: FormData) {
    return this.http.put(this.baseUrl + 'EditMovie', fd, { withCredentials: true }).pipe();
  }

  SearchMovies(search: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.baseUrl + 'SearchMovies/' + search, this.headers).pipe();
  }

  DeleteAllMovies(ids: string[]) {
    return this.http.post(this.baseUrl + 'DeleteMovies', ids, this.headers).pipe();
  }

  GetAllMovieLinks(search: string): Observable<MovieLink[]> {
    return this.http.get<MovieLink[]>(this.baseUrl + 'GetAllMovieLinks/' + search, this.headers).pipe();
  }

  GetMovieLink(id: number): Observable<MovieLink> {
    return this.http.get<MovieLink>(this.baseUrl + 'GetMovieLink/' + id, this.headers).pipe();
  }

  AddMovieLink(movieLink: MovieLink) {
    return this.http.post(this.baseUrl + 'AddMovieLink', movieLink, this.headers).pipe();
  }

  EditMovieLink(fd: FormData) {
    return this.http.put(this.baseUrl + 'EditMovieLink', fd, { withCredentials: true }).pipe();
  }

  DeleteAllMovieLinks(ids: string[]) {
    return this.http.post(this.baseUrl + 'DeleteAllMovieLinks', ids, this.headers).pipe();
  }

  GetAllMovieActors(search: string): Observable<MovieActor[]> {
    return this.http.get<MovieActor[]>(this.baseUrl + 'GetAllMovieActors/' + search, this.headers).pipe();
  }

  GetMovieActor(id: number): Observable<MovieActor> {
    return this.http.get<MovieActor>(this.baseUrl + 'GetMovieActor/' + id, this.headers).pipe();
  }

  AddMovieActor(movieActor: MovieActor) {
    return this.http.post(this.baseUrl + 'AddMovieActor', movieActor, this.headers).pipe();
  }

  EditMovieActor(movieActor: MovieActor) {
    return this.http.put(this.baseUrl + 'EditMovieActor', movieActor, this.headers).pipe();
  }

  DeleteAllMovieActors(ids: string[]) {
    return this.http.post(this.baseUrl + 'DeleteAllMovieActors', ids, this.headers).pipe();
  }
}
