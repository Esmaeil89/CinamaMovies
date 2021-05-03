import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/Models/LoginModel';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterServiceService } from 'src/app/services/register-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: RegisterServiceService,
    private router: Router,
    private auth: AuthService) { }

  message: string;
  loginForm: FormGroup;
  logModel: LoginModel
  validateMessages = {
    email:{
      required:'البريد الالكتروني مطلوب',
      notValid:'البريد الالكتروني المدخل غير صحيح'
    },
    password:{
      required:'كلمة المرور مطلوبة'
    }
  }

  ngOnInit(): void {
    this.message='';
    this.logModel = {
      email:'',
      password: '',
      rememberMe: false
    }
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: false
    });
  }
  login(){
    if(this.loginForm.valid){
      this.validateModel();
      this.service.Login(this.logModel).subscribe(x=>{
        const rem = !!this.loginForm.value.rememberMe;
        const email = this.loginForm.value.email;
        this.auth.installStorge(rem, email);
        this.router.navigate(['home']).then(x=> {window.location.reload()});
      }, ex=> console.log(ex));
    }
  }
  validateModel() {
    this.logModel.email = this.loginForm.value.email;
    this.logModel.password = this.loginForm.value.password;
    this.logModel.rememberMe = this.loginForm.value.rememberMe;
  }
}
