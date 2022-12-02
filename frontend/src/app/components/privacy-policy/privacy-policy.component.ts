import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ExpressService } from 'src/app/shared/services/express.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LogExit } from 'concurrently';
import { EventEmitter } from "events"
@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
body:any;
obj:any;
  constructor( public authService: AuthService,
    private http: HttpClient,
    private expressService: ExpressService,
    private router: Router ) { }

 // authService?: AuthService;
   contentEditable: boolean = true
  hidden: boolean = false;
  ngOnInit(): void {

    console.log(this.authService?.role.admin)
if(this.authService?.role.admin === true){
this.contentEditable = true;

}else{
  this.contentEditable = false;
  this.hidden = true;
}


document.querySelector('body')?.remove();
  
this.expressService.getPolicy(1).subscribe(
  (response: any) => {
this.obj = response;
  
    var parser = new DOMParser();
 var doc = parser.parseFromString(this.obj[0].policyDoc, 'text/html');
 document.querySelector('html')?.append(doc.documentElement);

 let btn = document.createElement('button')
btn.innerText = "save"
 btn.addEventListener("click", Event => this.save())
 document.querySelector('body')?.appendChild(btn);


  },
  (error) => {
    console.log(error);
  });

 
  }

  save(){
    if(this.authService?.role.admin === true){
      this.contentEditable = true;
      
   console.log("hello World")
     this.body =  document.querySelector('body')?.innerHTML
     console.log("hello World1")

/*
 this.expressService.putPolicy(this.body).subscribe(
  (response: any) => {
    console.log(response);
  },
  (error) => {
    console.log("hello World")
    console.log(error);
  });
*/
  this.expressService.postPolicy(this.body,1).subscribe(
    (response: any) => {
      
    console.log("in the post")
    },
    (error) => {
      console.log("hello World")
      console.log(error);
    });

var parser = new DOMParser();
 var doc = parser.parseFromString(this.body, 'text/html');

  }
}
  

}
