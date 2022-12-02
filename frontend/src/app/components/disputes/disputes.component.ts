import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { map, Observable, Subscription, take } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin.service';
import { ExpressService } from 'src/app/shared/services/express.service';
import { Dispute } from 'src/app/shared/services/dispute'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { reload } from 'firebase/auth';
@Component({
  selector: 'app-disputes',
  templateUrl: './disputes.component.html',
  styleUrls: ['./disputes.component.css']
})
export class DisputesComponent implements OnInit {
  users: any[] = [];
  subscription: Subscription | undefined = undefined;
  reviewN: number |undefined;
  dateR: string = "";
  dateD: string = "";
  dateN: string = "";
  dispute?:any;
obj:any =[];


  constructor(private adminService: AdminService,
    private http: HttpClient,
    private expressService: ExpressService,
    private router: Router) { }

  ngOnInit(): void {
    this.adminService.GetUsers()?.pipe(
      take(1),
      map((response) => {
        this.users = [];
        Object.keys(response).forEach((key: any) => {
          let user = response[key];
          user['uid'] = key;
          this.users.push(user);
        })
      })
    ).subscribe();
    this.getAllDisputes();
  }

  storeResults() {
    if (this.reviewN === undefined || this.dateD === "" || this.dateR === "") {
      console.log("error")
    }
    else {
      this.expressService.addDispute( this.reviewN, this.dateD, this.dateR).subscribe(
        (response: any) => {
          console.log(response);
          
        },
        (error) => {
          console.log("hello World")
          console.log(error);
        });
    }
    this.refresh();
  
  }
getAllDisputes(){
this.expressService.getDispute().subscribe(
  (response: any) => {
 
this.obj = response;

console.log(this.obj.reviewId);
  },
  (error) => {
    console.log("hello World")
    console.log(error);
  });

}
refresh(): void {
  window.location.reload();
}


}




