import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ExpressService } from 'src/app/shared/services/express.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dmca-policy',
  templateUrl: './dmca-policy.component.html',
  styleUrls: ['./dmca-policy.component.css']
})
export class DmcaPolicyComponent implements OnInit {
  obj:any;
  hidden: boolean = false;
  edit: boolean = false;
  constructor(public authService: AuthService,
    private http: HttpClient,
    private expressService: ExpressService,
    private router: Router) { }

  ngOnInit(): void {
    if(this.authService.role ? this.authService.role.admin : false){
      this.hidden = false;
    }else{
      this.hidden = true;
    }
    this.expressService.getPolicy(3).subscribe(
      (response: any) => {
      this.obj = response[0].policyDoc;
      console.log(response[0].policyDoc);
      },
      (error) => {
        console.log(error);
      });
  }

  save(innerHTML: any){
    console.log(innerHTML);
    if(this.authService.role ? this.authService.role.admin : false){
      this.expressService.postPolicy(innerHTML,3).subscribe(
        (response: any) => {
        console.log("in the post")
        this.expressService.getPolicy(3).subscribe(
          (response: any) => {
          this.obj = response[0].policyDoc;
          this.edit = false;
          console.log(response[0].policyDoc);
          },
          (error) => {
            console.log(error);
          });
        },
        (error) => {
          console.log("hello World")
          console.log(error);
        });
      }
}


}
