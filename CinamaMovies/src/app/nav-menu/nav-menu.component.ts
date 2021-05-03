import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RegisterServiceService } from '../services/register-service.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  constructor(
    private service: RegisterServiceService,
    private router: Router,
    private auth: AuthService
  ) { }

  title = 'Cinama Movies';

  ngOnInit(): void {
    if(this.auth.isUserRegisterd()){
      if(this.auth.isExpireDate(this.auth.expire)){
        this.logout();
      }

      this.auth.ValidateUser(this.auth.email, this.auth.role).subscribe(x=>{
        console.log('user is Authorized');
        return true;
      }, ex=>{
        console.log(ex);
        this.logout();
      });
    }
  }
  logout(){
    this.service.Logout().subscribe(x=>{
      localStorage.clear();
      console.log('authoraization return false')
      this.router.navigate(['home'])
    }, ex=> console.log(ex));
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
  isAdmin(){
    var role = !!this.auth.role;
    if(role){
      if(this.auth.role.toLowerCase() == 'admin'){
        return true;
      }
    }
    return false;
  }
}
