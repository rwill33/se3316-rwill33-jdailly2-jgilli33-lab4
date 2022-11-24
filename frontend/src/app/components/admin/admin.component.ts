import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: any = [];
  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.users = this.adminService.GetUsers();
  }

  changeUserPermission(data: any, uid: string) {
    console.log(data.target.checked, uid);
    this.adminService.ChangeUserPermission(data.target.checked, uid);
    this.users = this.adminService.GetUsers();
  }
}
