import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterServiceService } from 'src/app/services/register-service.service';

@Component({
  selector: 'app-register-confirm',
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.css']
})
export class RegisterConfirmComponent implements OnInit {

  constructor(
    private activeRoute: ActivatedRoute,
    private service: RegisterServiceService
  ) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(param=>{
      const id= param['ID'];
      const token= param['TOKEN'];
      if(id && token){
        console.log('id= ' + id + ' & token= ' + token);
        this.service.EmailConfirm(id, token).subscribe(x=>{
          console.log('email confirmed successfully')
        }, ex=> console.log(ex));
      }
    }, ex=> console.log(ex));
  }

}
