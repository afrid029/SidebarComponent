import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { Menubar} from 'primeng/menubar'
import { SplitButtonModule } from 'primeng/splitbutton'
import { ButtonModule } from 'primeng/button';
import { DesignResponsiveObservablesService } from '../../Services/design-responsive.observables.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [Menubar, CommonModule, AvatarModule, SplitButtonModule, ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  encapsulation : ViewEncapsulation.None
})

export class NavbarComponent implements OnInit {
  navOptionClass = signal<string>('')
  profileClass = signal<string>('bg-[#f6f8f9] p-2 rounded-lg');
  mobileNavClass = signal<string>('hidden');
  mobileNavIcon = signal<string>('pi pi-bars')
  isMobile = signal<boolean>(false);
  isMobileSideOpened = signal <boolean>(false);

  profileOptions : splitButtonOptions[] = [
    {
     label : 'Setting',
     icon : 'pi pi-cog',
     command : () => this.navigateTo('/setting')
    },
    {
     label : 'Logout',
     icon : 'pi pi-sign-out',
     command : () => this.logout()
    },

  ]

  private _responsiveObsr : DesignResponsiveObservablesService = inject(DesignResponsiveObservablesService);
  private router : Router = inject(Router);

  ngOnInit(): void {
    this._responsiveObsr.onIsMobileChanged.subscribe({
      next : (value) => {
        this.isMobile.set(value);
        this.setClasses();
      }
    });

    this._responsiveObsr.OnIsMobileSidebarOpenedChanged.subscribe({
      next : (value) => {
        console.log(value);
        
        this.isMobileSideOpened.set(value);
        this.setMobileNavIcon();
      }
    })
  }

  setClasses() {
    if(this.isMobile()) {
      this.navOptionClass.set('hidden');
      this.profileClass.set('hidden');
      this.mobileNavClass.set('block')
    } else {
       this.navOptionClass.set('');
       this.profileClass.set('bg-[#f6f8f9] p-2 rounded-lg');
         this.mobileNavClass.set('hidden')
    }
  }

  setMobileNavIcon() {
    if(this.isMobileSideOpened()) {
      this.mobileNavIcon.set('pi pi-times')
    } else {
      this.mobileNavIcon.set('pi pi-bars')
    }
  }

  handleMobileNavbar(){
    this._responsiveObsr.setIsMobileSidebarOpened();
  }

  navigateTo(path : string) {
    // console.log('tested Child');
    this.router.navigateByUrl(path)
    
  }
  logout() {
    console.log('LogOut');
    
  }

}

export interface splitButtonOptions {
  label : string;
  icon : string;
  command : () => void

}
