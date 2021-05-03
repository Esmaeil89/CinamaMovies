import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordModel } from 'src/app/Models/ResetPasswordModel';
import { CryptService } from 'src/app/services/crypt.service';
import { RegisterServiceService } from 'src/app/services/register-service.service';

@Component({
  selector: 'app-password-confirm',
  templateUrl: './password-confirm.component.html',
  styleUrls: ['./password-confirm.component.css']
})
export class PasswordConfirmComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: RegisterServiceService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private encService: CryptService
  ) { }

  userForm:FormGroup;
  reqEx: RegExp;
  passModel: ResetPasswordModel
  validateMessages = {
    password:{
      required:'كلمة المرور مطلوبة',
      minLenth:'الحد الادنى لكلمة المرور 6 مقاطع',
      notMatch:'كلمة المرور يجب ان تحتوي على رقم - حرف كبير - حرف صغير - حرف مميز'
    },
    passwordConfirm:{
      required:'تأكيد كلمة المرور مطلوب',
      minLenth:'الحد الادنى لكلمة المرور 6 مقاطع',
      isMatch:'كلمتا المرور غير متطابقتين '
    }
  }

  ngOnInit(): void {
    this.passModel={
      id:'',
      password:'',
      token:''
    };
    this.userForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.activeRoute.queryParams.subscribe(param=>{
      var exist=false;
      this.passModel.id= param['ID'];
      this.passModel.token= param['TOKEN'];
      if(this.passModel.id && this.passModel.token){
        var keys = Object.keys(localStorage);
        keys.forEach(element => {
          if(element !== null && element.includes('token')){
            var item = localStorage.getItem(element);
            if(item != null){
              var token = this.encService.Decrypt(item);
              if(this.passModel.token === token){
                exist = true;
              }
            }
          }
        });
        if(!exist){
          this.router.navigate(['home']).then(x=>{window.location.reload()});
        }
      }else{
        this.router.navigate(['home']).then(x=>{window.location.reload()});
      }
    }, ex=> console.log(ex));
  }
  isPasswordNotMatch(){
    if(this.userForm.get('password').valid &&  this.userForm.get('passwordConfirm').valid){
      if(this.userForm.value.password !== this.userForm.value.passwordConfirm){
        return true;
      }
    }
    return false;
  }
  isPasswordNotValid(){
    const pass = this.userForm.value.password;
    if(this.userForm.get('password').valid){
      this.reqEx = new RegExp('[a-z]');
      if(!this.reqEx.test(pass)){
        this.validateMessages.password.notMatch = "كلمة المرور يجب ان تحتوي على حرف صغير واحد على الاقل";
        return true;
      }
      this.reqEx = new RegExp('[A-Z]');
      if(!this.reqEx.test(pass)){
        this.validateMessages.password.notMatch = "كلمة المرور يجب ان تحتوي على حرف كبير واحد على الاقل";
        return true;
      }

      this.reqEx = new RegExp('[~!@#$%^&*()_+<>{}]');
      if(!this.reqEx.test(pass)){
        this.validateMessages.password.notMatch = "كلمة المرور يجب ان تحتوي على حرف مميز واحد على الاقل";
        return true;
      }
      this.reqEx = new RegExp('[0-9]');
      if(!this.reqEx.test(pass)){
        this.validateMessages.password.notMatch = "كلمة المرور يجب ان تحتوي على رقم واحد على الاقل";
        return true;
      }
    }
    return false;
  }
  ResetPassword(){
    if(this.userForm.valid){
      this.passModel.password = this.userForm.value.password;
      this.service.ResetPassword(this.passModel).subscribe(x=>{
        this.router.navigate(['login'])
      }, ex=> console.log(ex));
    }
  }

}
