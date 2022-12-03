import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {

  modalRef?: BsModalRef;
  oldPasswordError?: boolean;
  passwordError?: boolean;
  confirmPasswordError?: boolean;
  error?: boolean;
  errorMessage?: string | null;
  success: boolean = false;
  isAdmin: boolean = this.authService.role.admin;
  constructor(
    public authService: AuthService,
    private modalService: BsModalService
  ) {
    
    this.authService.getError().subscribe((value) => {
      this.error = value;
    });
    this.authService.getErrorMessage().subscribe((value) => {
      this.errorMessage = value;
    });
    this.authService.getSuccess().subscribe((value) => {
      this.success = value;
      if (value === true) {
        this.modalRef?.hide();
      }
    });
    this.modalService.onHidden.subscribe(() => {
      this.error = false;
      this.errorMessage = "";
      this.oldPasswordError = false;
      this.passwordError = false;
      this.confirmPasswordError = false;
    })
   }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef?.hide();
  }
inputValidation(oldPassword: string, password: string, confirmPassword: string) {
  if(oldPassword === "") {
    this.oldPasswordError = true;
  } else {
    this.oldPasswordError = false;
  }
  if(password === "") {
    this.passwordError = true;
  } else {
    this.passwordError = false;
  }
  if(confirmPassword === "") {
    this.confirmPasswordError = true;
  } else {
    this.confirmPasswordError = false;
  }
  if (oldPassword === "" || password === "" || confirmPassword === "") {
    return
  }
  this.authService.ChangePassword(oldPassword, password, confirmPassword);
 }

  ngOnInit(): void {
    this.success = false;
  }

  ngOnDestroy(): void {
      this.success = false;
  }


}
