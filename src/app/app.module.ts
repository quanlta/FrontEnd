import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './client/home/home.component';
import { CoursesService } from './api/services/courses/courses.service';
import {
  HttpClientJsonpModule,
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    DataTablesModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NgxPaginationModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  providers: [provideHttpClient(withFetch()), CoursesService],
  bootstrap: [],
})
export class AppModule {}
