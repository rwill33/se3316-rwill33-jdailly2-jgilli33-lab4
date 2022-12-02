import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-dmca-policy',
  templateUrl: './dmca-policy.component.html',
  styleUrls: ['./dmca-policy.component.css']
})
export class DmcaPolicyComponent implements OnInit {

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
