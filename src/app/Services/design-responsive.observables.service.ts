import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DesignResponsiveObservablesService {
  private _isMobile = new BehaviorSubject<boolean>(false);
  public onIsMobileChanged = this._isMobile.asObservable();

  private _isMobileSidebarOpened = new BehaviorSubject<boolean>(false);
  public OnIsMobileSidebarOpenedChanged = this._isMobileSidebarOpened.asObservable();

  public setIsMobile(state: boolean) {
    this._isMobile.next(state);
  }

  public setIsMobileSidebarOpened() {
    if(this._isMobileSidebarOpened.value) {
       this._isMobileSidebarOpened.next(false);
    }else {
       this._isMobileSidebarOpened.next(true);
    }
  }
}
