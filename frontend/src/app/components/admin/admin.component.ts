import { Component, OnInit } from '@angular/core';
import { map, Observable, Subscription, take } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  subscription: Subscription | undefined = undefined;
  constructor(
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.adminService.GetUsers()?.pipe(
      take(1),
      map((response) => {
        this.users = [];
        Object.keys(response).forEach((key: any) =>{
          let user = response[key];
          user['uid'] = key;
          this.users.push(user);
        })
      })
    ).subscribe();
  }

  changeUserPermission(data: any, uid: string) {
    console.log(data.target.checked, uid);
    this.adminService.ChangeUserPermission(data.target.checked, uid);
  }

  setDisabled(data: any, uid: string) {
    console.log(data.target.checked, uid);
    this.subscription = this.adminService.setDisabled(data.target.checked, uid).subscribe(
      (response: any) => {
        this.subscription?.unsubscribe();
      },
      (error) => {
        console.log(error);
      });
  }
}
