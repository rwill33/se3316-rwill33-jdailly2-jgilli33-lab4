import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ExpressService } from 'src/app/shared/services/express.service';

@Component({
  selector: 'app-takedown-procedure',
  templateUrl: './takedown-procedure.component.html',
  styleUrls: ['./takedown-procedure.component.css']
})
export class TakedownProcedureComponent implements OnInit {
  obj:any;
  hidden: boolean = false;
  edit: boolean = false;
  constructor(
    private authService: AuthService,
    private expressService: ExpressService
  ) { }

  ngOnInit(): void {
    if(this.authService.role ? this.authService.role.admin : false){
      this.hidden = false;
    } else{
      this.hidden = true;
    }

    this.expressService.getPolicy(4).subscribe(
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
      this.expressService.postPolicy(innerHTML,4).subscribe(
        (response: any) => {
        console.log("in the post")
        this.expressService.getPolicy(4).subscribe(
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
