import { Routes } from '@angular/router';
import { HomeComponent } from './client/home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './dashboard/user/user.component';
import { CoursesDetailComponent } from './client/home/courses-detail/courses-detail.component';
import { CoursesComponent } from './dashboard/courses/courses.component';
import { UserInfoComponent } from './client/user-info/user-info.component';
import { IncomeComponent } from './dashboard/income/income.component';
import { BlogComponent } from './dashboard/blog/blog.component';
import { CartComponent } from './client/cart/cart.component';
import { CourseHomeComponent } from './course-home/course-home.component';
import { WishlistComponent } from './client/user-info/wishlist/wishlist.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { ListBlogComponent } from './list-blog/list-blog.component';
import { CourseNotRegisterdComponent } from './course-not-registerd/course-not-registerd.component';
<<<<<<< HEAD
import { AdminGuard } from './admin-guard.guard';
import { HomeUserComponent } from './home-user/home-user.component';
export const routes: Routes = [  
  { path: 'home', component: HomeUserComponent },
=======
export const routes: Routes = [
>>>>>>> f587f1debac57a0fcc52981fb5c4efbecbff23d6
  { path: '', component: HomeComponent },
  { path: 'userInfo', component: UserInfoComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'cart', component: CartComponent },
  { path: 'course-home', component: CourseHomeComponent },
  { path: 'my-wishlist', component: WishlistComponent },
  { path: 'list-blogs', component: ListBlogComponent },
<<<<<<< HEAD
  { path: 'course-notregistered', component: CourseNotRegisterdComponent },
  { path: 'courses/showSectionAndVideo/:id', component: CoursesDetailComponent, data: { title: 'courses details' } },
  { path: 'course-home/courses/showSectionAndVideo/:id', component: CoursesDetailComponent, data: { title: 'courses details' } },
  { path: 'blogs/:id', component: BlogDetailComponent, data: { title: 'blogs details' } },
  { path: 'list-blogs/blogs/:id', component: BlogDetailComponent, data: { title: 'blogs details' } },
=======

  { path: 'course-notregistered', component: CourseNotRegisterdComponent },

  {
    path: 'courses/showSectionAndVideo/:id',
    component: CoursesDetailComponent,
    title: 'courses details',
  },  {
    path: 'course-home/courses/showSectionAndVideo/:id',
    component: CoursesDetailComponent,
    title: 'courses details',
  },
>>>>>>> f587f1debac57a0fcc52981fb5c4efbecbff23d6
  {
    path: 'blogs/:id',
    component: BlogDetailComponent,
    title: 'blogs details',
  },

  
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AdminGuard], // Apply AdminGuard to restrict access
    children: [
      { path: 'user', component: UserComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'income', component: IncomeComponent },
    ],
  },
];
