import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild(SidebarComponent) sidebar! : SidebarComponent;
  opened : boolean = false; 
  icon : string = "pi pi-bars";
 
  openSidebar() {
    this.opened = !this.opened;    
    if(this.opened) {
      this.icon = "pi pi-times"
    }else {
      this.icon = "pi pi-bars"
    }
    this.sidebar.openMobileMenu();
    
  }
  
}
