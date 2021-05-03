import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterModel } from 'src/app/Models/RegisterModel';
import { RegisterServiceService } from 'src/app/services/register-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: RegisterServiceService
  ) { }

  userForm:FormGroup;
  reg: RegisterModel;
  reqEx: RegExp;
  message: string;
  isBusy: boolean;
  validateMessages = {
    userName:{
      required:'اسم المستخدم مطلوب',
      exist:''
    },
    email:{
      required:'البريد الالكتروني مطلوب',
      notValid:'البريد الالكتروني المدخل غير صحيح',
      exist:''
    },
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
    this.message='';
    this.isBusy = false;
    this.userForm = this.fb.group({
      userName:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.reg = {
      userName: '',
      email:'',
      password: ''
    }
    this.userForm.valueChanges.subscribe(x=>{
      if(this.userForm.status === 'VALID'){
        console.log('Valid Form');
        this.isBusy= true;
      }else{
        this.isBusy= false;
      }
    }, ex=> console.log(ex));
  }

  register(){
    if(this.userForm.valid){
      this.validateRegisterModel();
      this.service.Register(this.reg).subscribe(x=>{
        this.message = 'تمت عملية التسجيل بنجاح';
        this.userForm.reset();
        this.ngOnInit();
      }, ex=> console.log(ex));
    }
  }
  validateRegisterModel() {
    this.reg.userName = this.userForm.value.userName;
    this.reg.email = this.userForm.value.email;
    this.reg.password = this.userForm.value.password;
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

  isUserNameExist(){
    const userName = this.userForm.value.userName;
    if(this.userForm.get('userName').valid && this.isBusy === false){
       this.service.UserExists(userName).subscribe(list=>{
        this.validateMessages.userName.exist='اسم المستخدم هذا مستعمل ';
         return true;
       }, ex=> {this.validateMessages.userName.exist='';});
    }else{
      this.validateMessages.userName.exist='';
    }
    return false;
  }
  isEmailExist(){
    const email = this.userForm.value.email;
    if(this.userForm.get('email').valid && this.isBusy === false){
      this.service.UserEmailExists(email).subscribe(list=>{
        this.validateMessages.email.exist='البريد الالكتروني هذا مستعمل';
        return true;
      }, ex=> {this.validateMessages.email.exist='';});
    }else{
      this.validateMessages.email.exist='';
    }
    return false;
  }
}
