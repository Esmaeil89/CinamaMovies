import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CryptService } from 'src/app/services/crypt.service';
import { RegisterServiceService } from 'src/app/services/register-service.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: RegisterServiceService,
    private encService: CryptService
    ) { }

  message: string;
  forgetPassForm: FormGroup;
  validateMessages = {
    email:{
      required:'البريد الالكتروني مطلوب',
      notValid:'البريد الالكتروني المدخل غير صحيح'
    }
  }

  ngOnInit(): void {
    this.message='';
    this.forgetPassForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  requestPassword(){
    if(this.forgetPassForm.valid){
      var email = this.forgetPassForm.value.email;
      this.service.ForgetPassword(email).subscribe(x=>{
        var token = Object.values(x).toString();
        var i=0;
        var exist = false;
        while (localStorage.getItem('token'+i) !== null) {
          i++;
          if(localStorage.getItem('token'+i) !== null){
            localStorage.setItem('token'+ i, this.encService.Encrypt(token));
            exist=true;
            break;
          }
        }
        if(!exist){
          localStorage.setItem('token'+ i, this.encService.Encrypt(token))
        }
        this.message='اذا كان الايميل المدخل صحيح ستصله رسالة استعادة للكلمة المرور';
      }, ex=> console.log(ex));
    }
  }
}
