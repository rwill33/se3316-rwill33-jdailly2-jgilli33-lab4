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
  body:any;
  obj:any;
  contentEditable: boolean = true
  hidden: boolean = false;
  constructor(public authService: AuthService,
    private http: HttpClient,
    private expressService: ExpressService,
    private router: Router) { }

  ngOnInit(): void {
    console.log(this.authService?.role.admin)
    if(this.authService?.role.admin === true){
    this.contentEditable = true;
    
    }else{
      this.contentEditable = false;
      this.hidden = true;
    }
    
     
    document.querySelector('body')?.remove();
    
    this.expressService.getPolicy(15).subscribe(
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
      
    //let btn =document.querySelector('button')
 //  document.querySelector('button')?.remove();
   
     this.body =  document.querySelector('body')?.innerHTML
     
    //const body  =  document.getElementsByTagName('body') as unknown as HTMLInputElement;
 //let txt =body.innerText
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
  this.expressService.postPolicy(this.body,15).subscribe(
    (response: any) => {
      
    console.log("in the post")
    },
    (error) => {
      console.log("hello World")
      console.log(error);
    });

var parser = new DOMParser();
 var doc = parser.parseFromString(this.body, 'text/html');
 //document.querySelector('html')?.appendChild(doc.documentElement)
//document.createElement('body').append
//document.getElementById("btnLocation")?.append(btn)
  }
}


}
