import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphqlModule } from './services/graphql.module';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    GraphqlModule,
    CommonModule,
    ToolbarComponent,
    ProductsTableComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
