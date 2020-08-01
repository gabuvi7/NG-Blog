import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class IdentityGuard implements CanActivate {
constructor(
  private _router: Router,
  private _userService: UserService
){
 
}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let identity = this._userService.getIdentity();
      if(identity){
        return true;
      }else{
        this._router.navigate(['/login']);
        return false;
      }
  }
  
}
