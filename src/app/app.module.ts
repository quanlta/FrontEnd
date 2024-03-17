import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CoursesService } from './api/services/courses/courses.service';
import { CoursesDetailComponent } from './client/home/courses-detail/courses-detail.component';
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
  declarations: [
    
    CoursesDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
  bootstrap: [] // No need to bootstrap any component here
})
export class AppModule {}
export class CoursesDetailModule {}
