import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-acceptable-use-policy',
  templateUrl: './acceptable-use-policy.component.html',
  styleUrls: ['./acceptable-use-policy.component.css']
})
export class AcceptableUsePolicyComponent implements OnInit {

  constructor(public authService: AuthService) { }
  contentEditable: boolean = true
  ngOnInit(): void {
    if(this.authService?.role.admin === true){
      this.contentEditable = true;
      
      }else{
        this.contentEditable = false;
      }
  }

}
