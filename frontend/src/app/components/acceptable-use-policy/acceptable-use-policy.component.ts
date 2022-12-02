import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ExpressService } from 'src/app/shared/services/express.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-acceptable-use-policy',
  templateUrl: './acceptable-use-policy.component.html',
  styleUrls: ['./acceptable-use-policy.component.css']
})
export class AcceptableUsePolicyComponent implements OnInit {
  contentEditable: boolean = true
  hidden: boolean = false;
  body:any;
obj:any;
  constructor(public authService: AuthService,
    private http: HttpClient,
    private expressService: ExpressService,
    private router: Router) { }
 
  ngOnInit(): void {
    if(this.authService?.role.admin === true){
      this.contentEditable = true;
      
      }else{
        this.contentEditable = false;
      }


      document.querySelector('body')?.remove();
  
      this.expressService.getPolicy(16).subscribe(
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
      
      
    
      this.body =  document.querySelector('body')?.innerHTML
    
 
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
   this.expressService.postPolicy(this.body,16).subscribe(
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
