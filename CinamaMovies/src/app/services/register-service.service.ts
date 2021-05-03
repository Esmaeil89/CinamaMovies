import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterModel } from '../Models/RegisterModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginModel } from '../Models/LoginModel';
import { ResetPasswordModel } from '../Models/ResetPasswordModel';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrl= 'http://localhost:25771/Account/';
  headers={
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials : true
  }

  Register(reg: RegisterModel): Observable<RegisterModel>{
    return this.http.post<RegisterModel>(this.baseUrl+ 'Register', reg, this.headers).pipe()
  }
  // GetAllUsers(): Observable<Users[]>{
  //   return this.http.get<Users[]>(this.baseUrl+ 'GetAllUsers').pipe()
  // }

  UserExists(userName: string){
    return this.http.get(this.baseUrl+ 'UserExists?userName=' + userName).pipe()
  }

  UserEmailExists(email: string){
    return this.http.get(this.baseUrl+ 'UserEmailExists?email='+ email).pipe()
  }

  Login(login: LoginModel): Observable<LoginModel>{
    return this.http.post<LoginModel>(this.baseUrl+ 'Login', login, this.headers).pipe()
  }
  Logout(){
    return this.http.get(this.baseUrl+ 'Logout', {withCredentials : true}).pipe()
 }

  EmailConfirm(id: string, token: string){
    return this.http.get('http://localhost:25771/Account/RegistrationConfirm?id='+ id + '&token=' + token).pipe()
  }
  ForgetPassword(email: string){
    return this.http.get(this.baseUrl+ 'ForgetPassword/=' + email).pipe()
  }
  ResetPassword(resetModel: ResetPasswordModel): Observable<ResetPasswordModel>{
    return this.http.post<ResetPasswordModel>(this.baseUrl+ 'RestPassword', resetModel, this.headers).pipe()
  }
}
