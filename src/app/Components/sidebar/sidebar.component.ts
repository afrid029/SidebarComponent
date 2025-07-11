import { Component, ElementRef, EventEmitter, inject, Input, OnInit, Output, signal, ViewChild } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClass } from 'primeng/styleclass';
import { Drawer } from 'primeng/drawer';
import { Router } from '@angular/router';
import { GetContentService } from '../../Services/get-content.service';
import { SelectButton } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToggleSwitch, ToggleSwitchChangeEvent } from 'primeng/toggleswitch';

@Component({
  selector: 'app-sidebar',
  imports: [AvatarModule, ButtonModule, Ripple, StyleClass, SelectButton, FormsModule, CommonModule, ToggleSwitch],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
 @Output() sideBarHandle = new EventEmitter();
  @ViewChild('sideBar') sideBar!: ElementRef;
  isMobile = signal<boolean>(false);
  startX = signal<number>(0);
  endX = signal<number>(0);


  private _content : GetContentService = inject(GetContentService);
  private _router : Router = inject(Router);


  Contents : any [] =[];

ngOnInit(): void {
      this.isMobile.set(window.innerWidth <= 645 ? true : false);
   this.loadSideBar();
}

loadSideBar() {
    this.Contents = this._content.getSideBarContents('admin')
}

openSlideBar() {
   this.loadSideBar()
}

toggleFix($event : ToggleSwitchChangeEvent){
    const toggleBtn = $event.originalEvent.currentTarget as HTMLElement;
    const state = $event.checked;
    
    if(state) {
        this.sideBar.nativeElement.classList.add('fixed-bar')
    } else {
        this.sideBar.nativeElement.classList.remove('fixed-bar')
    }
    
}

toggleMain($event : Event) {
    const main = $event.currentTarget as HTMLElement;
    const icon = main.childNodes[1] as HTMLElement;
    if(icon.classList.contains('slide-up')) {
        icon.classList.remove('slide-up');
        icon.classList.add('slide-down')
    } else {
        icon.classList.remove('slide-down')
         icon.classList.add('slide-up');
    }

}
toggleParent($event : Event) {
    const parent = $event.currentTarget as HTMLElement;

    if(parent.classList.contains('active-category')){
        parent.classList.remove('active-category');
        const icon = parent.childNodes[2] as HTMLElement;
        icon.classList.remove('slide-down');
        icon.classList.add('slide-up');
    } else {
        parent.classList.add('active-category');
        const icon = parent.childNodes[2] as HTMLElement;
        icon.classList.remove('slide-up');
        icon.classList.add('slide-down');
        
    }

}

navigateTo(path : string) {
    this._router.navigateByUrl(path);
    this.isMobile() ? this.sideBarHandle.emit() : '';
}

openMobileMenu() {
    const classList = this.sideBar.nativeElement.classList;

    if(classList.contains('mobile-side')) {
        classList.add('off-mobile-side')
        setTimeout(() => {
            classList.remove('mobile-side')
            classList.remove('off-mobile-side')
        },300)
    }
    else {
        classList.add('mobile-side')
    }
    
    
}

touchStart(event : TouchEvent) {
    this.startX.set(event.changedTouches[0].screenX);
    
}

touchEnd(event : TouchEvent) {

    this.endX.set(event.changedTouches[0].screenX);
    const diffInX = this.startX() - this.endX();
    if(this.isMobile() && diffInX > 70) {
        this.sideBarHandle.emit();
    }
    
    
}


}
