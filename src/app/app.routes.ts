import { Routes } from '@angular/router';
import { HomeComponent } from './client/home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './dashboard/user/user.component';
import { QuizComponent } from './client/quiz/quiz.component';
import { CoursesDetailComponent } from './client/home/courses-detail/courses-detail.component';
import { CoursesComponent } from './dashboard/courses/courses.component';
import { UserInfoComponent } from './client/user-info/user-info.component';
import { IncomeComponent } from './dashboard/income/income.component';
import { BlogComponent } from './dashboard/blog/blog.component';
import { BlogClientComponent } from './client/blog/blog.component';
import { CartComponent } from './client/cart/cart.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'userInfo', component: UserInfoComponent },
  { path: 'blog', component: BlogClientComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'courses/:id',
    component: CoursesDetailComponent,
    title: 'courses details',
  },
  {
    path: 'admin',
    component: DashboardComponent,
    children: [
      { path: 'user', component: UserComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'income', component: IncomeComponent },
    ],
  },
];
