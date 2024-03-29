import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoleModel } from 'src/app/Models/UserRoleModel';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent implements OnInit {

  constructor(
    private service: AdminService,
    private router: Router
 ) { }

 userRoles: UserRoleModel[];

  ngOnInit(): void {
    this.userRoles = [];

    this.GetUserRole();
  }
  GetUserRole() {
    this.service.GetUserRoles().subscribe(s => {
      this.userRoles = s;
      console.log(this.userRoles);
    }, ex => console.log(ex));
  }

  EditUserRole(userId: string, roleId: string) {
    this.router.navigate(['edituserrole', userId, roleId]);
  }

}
