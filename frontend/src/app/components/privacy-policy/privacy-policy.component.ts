import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor( public authService: AuthService ) { }

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

  }


  save(){


  }

}
