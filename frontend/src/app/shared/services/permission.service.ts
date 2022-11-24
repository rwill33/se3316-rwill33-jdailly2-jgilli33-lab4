import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(
    public authService: AuthService
  ) {}

  hasPermission(): Observable<boolean> {
    return this.authService.role.admin;
  }
}
