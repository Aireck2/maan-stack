import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    // DashboardComponent,
    // ProductsComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    ToolbarComponent,
    ProductsTableComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
