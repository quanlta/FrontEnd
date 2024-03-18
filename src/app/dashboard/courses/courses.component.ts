import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CoursesService } from '../../api/services/courses/courses.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent {
  coursesList: any[] = [];
  filteredCourses: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  constructor(    
    private router: Router, 
    private route:ActivatedRoute,
    private coursesService: CoursesService) { 
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }
  ngOnInit() {
    this.searchTerm = this.route.snapshot.params['searchTerm'];
    // this.getListCourses()
    this.getCourses();
  }
  chunkArray(array: any[], size: number): any[][] {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  }
  filterCourses(): void {
    this.filteredCourses = this.coursesList.filter((course: any) =>
      course.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  trackByIdx(index: number, item: any): number {
    return item.courseID;
  }
  getCourses(): void {
    this.coursesService.getAllCourses()
      .subscribe(courses => {
        this.coursesList = courses;
      });
  }
  // getListCourses(){
  //   this.coursesService.findByTitle(this.searchTerm).subscribe({
  //     next:res =>{
  //       this.coursesList = res;
  //       console.log(this.coursesList);
  //     },error: err =>{
  //       console.log(err);
  //     }
  //   })
  // }
  showAddCourseForm() {
    // Show the add course modal
    const addCourseModal = document.getElementById('addCourseModal');
    if (addCourseModal) {
      addCourseModal.style.display = 'block';
    }
  }

  saveCourse() {
    // Process and save the new course data
    // Close the modal after saving
    const addCourseModal = document.getElementById('addCourseModal');
    if (addCourseModal) {
      addCourseModal.style.display = 'none';
    }
  }
  pageChanged(event: any): void {
    this.currentPage = event.page;
  }
}
