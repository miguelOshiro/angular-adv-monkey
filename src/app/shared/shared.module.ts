import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ],
  exports: [
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class SharedModule { }
