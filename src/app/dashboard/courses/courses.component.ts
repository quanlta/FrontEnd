import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CoursesService } from '../../api/services/courses/courses.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [FormsModule, NgxPaginationModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent {
  coursesList: any;
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  constructor(private coursesService: CoursesService) { }
  ngOnInit() {
    this.getListCourses()
  }
  filterCourses(): any[] {
    return this.coursesList.filter((course: any) =>
      course.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getListCourses() {
    this.coursesService.getAll().subscribe(
      (response) => {
        console.log('response', response);

        alert('delete user success');
      },
      (error) => {
        // Handle login error
        console.error('delete user failed', error);
      }
    );
  }
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
