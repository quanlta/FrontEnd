import {
  Component,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
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
    }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchTerm = params['searchTerm'];
      this.getCourses();
    });
  }

  getCourses(): void {
    this.coursesService.findByTitle(this.searchTerm)
      .subscribe(courses => {
        this.coursesList = courses;
        this.filteredCourses = this.coursesList;
      });
  }

  filterCourses(): void {
    if (!this.searchTerm) {
      this.filteredCourses = this.coursesList;
    } else {
      this.filteredCourses = this.coursesList.filter((course: any) =>
        Object.values(course).some(value =>
          value && value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      );
    }
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