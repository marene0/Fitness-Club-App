import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './main/home-page/home-page.component';
import { CreateWorkoutPageComponent } from './workout/create-workout-page/create-workout-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomePageModule } from './main/home-page/home-page.module';
import { CreateWorkoutPageModule } from './workout/create-workout-page/create-workout-page.module';
import { HeaderModule } from './shared/header/header.module';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { AuthInterceptor } from './core/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { GoalsPageComponent } from './goals/goals/goals-page.component';
import { GoalsPageModule } from './goals/goals/goals-page.module';
import { FileUploadModule } from 'primeng/fileupload';
import { UploadComponent } from './shared/profile-picture/upload.component';
import { ToastModule } from 'primeng/toast';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { ExercisePageModule } from './exercise/exercise-page.module';
import { NotFoundComponent } from './shared/not-found/not-found.component';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CreateWorkoutPageComponent,
    GoalsPageComponent,
    UploadComponent,
    NotFoundComponent,
  ],
  imports: [
    FileUploadModule,
    CalendarModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    TableModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    CreateWorkoutPageModule,
    HeaderModule,
    CarouselModule,
    TagModule,
    HttpClientModule,
    ButtonModule,
    GoalsPageModule,
    HomePageModule,
    ToastModule,
    ChartModule,
    DropdownModule,
    ExercisePageModule,
    ProgressSpinnerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
