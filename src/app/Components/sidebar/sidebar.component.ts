import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-sidebar',
  imports: [AvatarModule, DrawerModule, ButtonModule, Ripple, StyleClass, SelectButton, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  @ViewChild('drawerRef') drawerRef!: Drawer;
  @Input() visible: boolean = false;
  options : any[] = [
    {label : "Admin" , value : "admin"},
    {label : "User" , value : "user"},
  ]
  role : string = 'admin'

  private _content : GetContentService = inject(GetContentService);
  private _router : Router = inject(Router);


  Contents : any [] =[];

ngOnInit(): void {
   this.loadSideBar();
}

loadSideBar() {
    this.Contents = this._content.getSideBarContents(this.role)
}

openSlideBar() {
    console.log(this.role);
   this.loadSideBar()
    this.visible = true;
}
toggleMain($event : Event) {
    const main = $event.currentTarget as HTMLElement;
    const icon = main.childNodes[2] as HTMLElement;
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
        // icon.classList.remove('pi-chevron-down');
        // icon.classList.add('pi-chevron-right');
        icon.classList.remove('slide-down');
        icon.classList.add('slide-up');
    } else {
        parent.classList.add('active-category');
        const icon = parent.childNodes[2] as HTMLElement;
        // icon.classList.remove('pi-chevron-right');
        // icon.classList.add('pi-chevron-down');
        icon.classList.remove('slide-up');
        icon.classList.add('slide-down');
        
    }

}

navigateTo(path : string) {
    console.log('path ',path);
    
    this._router.navigateByUrl(path);
    this.visible = false;
}


    closeCallback(e: Event): void {
        this.drawerRef.close(e);
        // this.visible = false;

    }

}
