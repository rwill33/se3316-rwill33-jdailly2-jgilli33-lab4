import { Component, OnInit } from '@angular/core';
import { map, Observable, Subscription, take } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-disputes',
  templateUrl: './disputes.component.html',
  styleUrls: ['./disputes.component.css']
})
export class DisputesComponent implements OnInit {
  users: any[] = [];
  subscription: Subscription | undefined = undefined;
  reviewN : any;
  dateR : String = "";
  dateD : String ="";
  dateN : String ="";



  constructor(  private adminService: AdminService) { }

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

storeResults(){
console.log(this.reviewN)
console.log(this.dateD)
console.log(this.dateN)
console.log(this.dateR)

if(this.reviewN === undefined || this.dateD === "" || this.dateN === "" || this.dateR === ""){
  console.log("error")
}




}



}
