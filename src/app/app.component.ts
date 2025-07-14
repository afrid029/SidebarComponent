import { AfterViewInit, Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { ButtonModule } from 'primeng/button';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout'
import { NavbarComponent } from './Components/navbar/navbar.component';
import { DesignResponsiveObservablesService } from './Services/design-responsive.observables.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, ButtonModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  @ViewChild(SidebarComponent) sidebar! : SidebarComponent;

  private _breakPoint : BreakpointObserver = inject(BreakpointObserver);
  private _responsiveObsr : DesignResponsiveObservablesService = inject(DesignResponsiveObservablesService);
 
  ngOnInit(): void {
     this._breakPoint
      .observe([Breakpoints.XSmall])
      .subscribe({
        next: (result:any) => {
            const key = Object.keys(result.breakpoints)
            this._responsiveObsr.setIsMobile(result.breakpoints[key[0]])
        }
      })

  }
}
