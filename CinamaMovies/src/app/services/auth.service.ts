import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CryptService } from './crypt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  email: string;
  expire: string;
  role: string;

  constructor(
    private http: HttpClient,
    private service: CryptService
    ) {
      if(this.isUserRegisterd()){
        this.email = this.service.Decrypt(localStorage.getItem('email'));
        this.expire = this.service.Decrypt(localStorage.getItem('expire'));
        this.role = this.service.Decrypt(localStorage.getItem('role'));
      }
     }
  installStorge(rem : boolean, email: string){
    const day = new Date();
      if(rem){
        day.setDate(day.getDate() + 10);
      }else{
        day.setMinutes(day.getMinutes() + 30);
      }
      localStorage.setItem('email', this.service.Encrypt(email));
      localStorage.setItem('expire', this.service.Encrypt(day.toString()));

      this.GetRoleName(email).subscribe(succ=>{
        localStorage.setItem('role', this.service.Encrypt(succ.toString()));
      }, ex=> console.log(ex));
  }

  isExpireDate(day: string){
    const dateNow = new Date;
    const expireDate = new Date(Date.parse(day));
    if(expireDate < dateNow){
      return true;
    }
    else return false;
  }
  isUserRegisterd(){
    const email = !!localStorage.getItem('email');
    const expire = !!localStorage.getItem('expire');
    const role = !!localStorage.getItem('role');
    if(email && expire && role){
      return true;
    }
    return false;
  }

  GetRoleName(email: string){
   return this.http.get('http://localhost:25771/Account/GetRoleName/'+ email, {responseType: 'text'}).pipe()
 }

  ValidateUser(email: string, role: string){
    return this.http.get('http://localhost:25771/Account/CheckUserClaims/'+ email+ '&' + role, {withCredentials : true}).pipe()
  }
}

