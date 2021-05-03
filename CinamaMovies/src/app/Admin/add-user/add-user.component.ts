import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { UserModel } from 'src/app/models/UserModel';
import { Users } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';
import { EditUserModel } from 'src/app/models/EditUserModel';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: AdminService,
    private activateRoute: ActivatedRoute
    ) { }

  message: string;
  errorMsg: string;
  userForm: FormGroup;
  user: UserModel;
  users: Users[];
  userData: Users;
  regex: RegExp;
  isbusy: boolean;
  title: string;
  btnTitle: string;
  isEditMode: boolean;
  editUserData: EditUserModel;
  id: string;

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
    this.id = '';
    this.isbusy = false;
    this.users = null;
    this.message = '';
    this.errorMsg = null;
    this.title = 'اضافة مستخدم جديد';
    this.btnTitle = 'اضافة مستخدم';
    this.userData = null;
    this.isEditMode = false;
    this.user = {
      userName: '',
      email: '',
      password: '',
      emailConfirmed: false,
      phoneNumber: null,
      country: null
    };


    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
      emailConfirmed: false,
      country: '',
      phone: ''
    });

    this.editUserData = {
      id: '',
      userName: '',
      email: '',
      emailConfirmed: false,
      password: '',
      phoneNumber: '',
      country: '',
    }

    this.userForm.valueChanges.subscribe(x => {
      if (this.userForm.status == 'VALID') {
        this.isbusy = true;
      }
    }, ex => console.log(ex))

    this.GetAllUsers();

    this.activateRoute.paramMap.subscribe(param => {
      var id = param.get('id');
      if (id) {
        this.service.GetUser(id).subscribe(x => {
          this.userData = x;
          this.title = 'تعديل بيانات مستخدم';
          this.btnTitle = 'تعديل وحفظ';
          this.isEditMode = true;
          this.AddUserData();
          this.id = id;
        }, ex => console.log(ex));
      }
    })
  }
  GetAllUsers() {
    this.service.GetAllUsers().subscribe((list) => {
      this.users = list;
    }, ex => console.log(ex));
  }
  AddUserData() {
    if (this.userData !== null) {
      this.userForm.setValue({
        userName: this.userData.userName,
        email: this.userData.email,
        password: this.userData.passwordHash,
        passwordConfirm: this.userData.passwordHash,
        emailConfirmed: this.userData.emailConfirmed,
        country: this.userData.country,
        phone: this.userData.phoneNumber
      });
    }
  }
  AddUser() {
    if (this.userForm.valid) {
      if (!this.isEditMode) {
        this.user.country = this.userForm.value.country;
        this.user.emailConfirmed = this.userForm.value.emailConfirmed;
        this.user.phoneNumber = this.userForm.value.phone;
        this.user.password = this.userForm.value.password;
        this.user.userName = this.userForm.value.userName;
        this.user.email = this.userForm.value.email;

        this.service.AddUser(this.user).subscribe(s => {
          this.ngOnInit();
          this.message = 'تم اضافة المستخدم الجديد بنبجاح';
        }, ex => this.errorMsg = ex);
      } else {
        this.editUserData.id = this.id;
        this.editUserData.email = this.userForm.value.email;
        this.editUserData.emailConfirmed = this.userForm.value.emailConfirmed;
        this.editUserData.password = this.userForm.value.password;
        this.editUserData.country = this.userForm.value.country;
        this.editUserData.phoneNumber = this.userForm.value.phone;
        this.editUserData.userName = this.userForm.value.userName;

        this.service.EditUser(this.editUserData).subscribe(x => {
          this.message = 'تم تعديل البيانات بنجاح';
        }, ex => console.log(ex));
      }
    }
  }
  validateRegisterModel() {
    this.user.userName = this.userForm.value.userName;
    this.user.email = this.userForm.value.email;
    this.user.password = this.userForm.value.password;
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
      this.regex = new RegExp('[a-z]');
      if(!this.regex.test(pass)){
        this.validateMessages.password.notMatch = "كلمة المرور يجب ان تحتوي على حرف صغير واحد على الاقل";
        return true;
      }
      this.regex = new RegExp('[A-Z]');
      if(!this.regex.test(pass)){
        this.validateMessages.password.notMatch = "كلمة المرور يجب ان تحتوي على حرف كبير واحد على الاقل";
        return true;
      }

      this.regex = new RegExp('[~!@#$%^&*()_+<>{}]');
      if(!this.regex.test(pass)){
        this.validateMessages.password.notMatch = "كلمة المرور يجب ان تحتوي على حرف مميز واحد على الاقل";
        return true;
      }
      this.regex = new RegExp('[0-9]');
      if(!this.regex.test(pass)){
        this.validateMessages.password.notMatch = "كلمة المرور يجب ان تحتوي على رقم واحد على الاقل";
        return true;
      }
    }
    return false;
  }
  isUserNameExist(){
    const userName = this.userForm.value.userName;
    if(this.userForm.get('userName').valid){
      for (const user of this.users.values()) {
        if (user.userName === userName && !this.isEditMode) {
          this.validateMessages.userName.exist='اسم المستخدم هذا مستعمل ';
          return true;
        }
        else if (this.isEditMode && user.userName === userName && user.id !== this.userData.id) {
          this.validateMessages.userName.exist='اسم المستخدم هذا مستعمل ';
          return true;
        }else{
          this.validateMessages.userName.exist='';
        }
      }
    }else{
      this.validateMessages.userName.exist='';
    }
    return false;
  }
  isEmailExist(){
    const email = this.userForm.value.email;
    if(this.userForm.get('email').valid){
      for (const item of this.users.values()) {
        if (item.email === email && !this.isEditMode) {
          this.validateMessages.email.exist='البريد الالكتروني هذا مستعمل';
          return true;
        }
        else if (this.isEditMode && item.email === email && item.id !== this.userData.id) {
          this.validateMessages.email.exist='البريد الالكتروني هذا مستعمل';
          return true;
        }else{
          this.validateMessages.email.exist='';
        }
      }
    }else{
      this.validateMessages.email.exist='';
    }
    return false;
  }
}
