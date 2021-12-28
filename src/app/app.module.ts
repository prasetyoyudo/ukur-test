import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductPanelComponent } from './product-panel/product-panel.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule }         from '@angular/common/http'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';



@NgModule({
  declarations: [
    AppComponent,
    ProductPanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
