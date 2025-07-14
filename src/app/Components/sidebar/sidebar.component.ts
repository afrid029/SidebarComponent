import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, OnInit, Output, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClass } from 'primeng/styleclass';
import { Router } from '@angular/router';
import { GetContentService } from '../../Services/get-content.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToggleSwitch, ToggleSwitchChangeEvent } from 'primeng/toggleswitch';
import { DesignResponsiveObservablesService } from '../../Services/design-responsive.observables.service';

@Component({
  selector: 'app-sidebar',
  imports: [AvatarModule, ButtonModule, Ripple, StyleClass, FormsModule, CommonModule, ToggleSwitch],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone : true,
  encapsulation : ViewEncapsulation.None
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @ViewChild('sideBar') sideBar!: ElementRef;
  isMobile = signal<boolean>(false);
  isMobileSideOpened = signal<boolean>(false);
  sidebarFooterClass = signal<string>('on-expand-block mobile-view h-auto sticky bottom-0 top-100 pb-1 w-full text-center footer')

  startX = signal<number>(0);
  endX = signal<number>(0);
  toggleClass = signal<string>('hidden')

  private _content : GetContentService = inject(GetContentService);
  private _router : Router = inject(Router);
  private _responsiveObsr : DesignResponsiveObservablesService = inject(DesignResponsiveObservablesService);


  Contents : any [] =[];

ngOnInit(): void {
   this.loadSideBar();

}

ngAfterViewInit(): void {
    this._responsiveObsr.onIsMobileChanged.subscribe({
        next : (value) => {
            this.isMobile.set(value)
            this.setMobileView();
        }
    });

       this._responsiveObsr.OnIsMobileSidebarOpenedChanged.subscribe({
    next : (value) => {
        this.isMobileSideOpened.set(value)
        this.openMobileMenu();
        
    },
   })
}

loadSideBar() {
    this.Contents = this._content.getSideBarContents('admin')
}

setMobileView() {
    const classList = this.sideBar.nativeElement.classList;
    if(this.isMobile()) {
        this.toggleClass.set('hidden');
        this.sidebarFooterClass.set('hidden')
        this.openMobileMenu();
    } else {
        classList.remove('mobile-side')
         this.toggleClass.set('on-expand-flex')
         this.sidebarFooterClass.set('on-expand-block mobile-view h-auto sticky bottom-0 top-100 pb-1 w-full text-center footer')
    }
    
}

toggleFix($event : ToggleSwitchChangeEvent){
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
    this.isMobile() ? this._responsiveObsr.setIsMobileSidebarOpened() : '';
}

openMobileMenu() {
    const classList = this.sideBar.nativeElement.classList;

    if(!this.isMobileSideOpened()) {
        classList.add('off-mobile-side')
        setTimeout(() => {
            classList.remove('mobile-side')
            classList.remove('off-mobile-side')
        },300)
    } else {
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
        this._responsiveObsr.setIsMobileSidebarOpened();
    }
    
    
}


}
