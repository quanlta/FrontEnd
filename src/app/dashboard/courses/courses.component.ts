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
import { ElementRef, Renderer2 } from '@angular/core';

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
  activeTab: any = 'tab1';

  constructor(    
    private router: Router, 
    private route:ActivatedRoute,
    private coursesService: CoursesService, private renderer: Renderer2, private el: ElementRef) { 
    }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchTerm = params['searchTerm'];
      this.getCourses();
    });
  }

  openTab(tabName: string) {
    this.activeTab = tabName
    const tablinks = this.el.nativeElement.querySelectorAll('.tab-links');
    const tabcontents = this.el.nativeElement.querySelectorAll('.tab-contents');

    tablinks.forEach((tablink: HTMLElement) => {
      this.renderer.removeClass(tablink, 'active-link');
    });

    tabcontents.forEach((tabcontent: HTMLElement) => {
      this.renderer.removeClass(tabcontent, 'active-tab');
    });

    const clickedTabLink = this.el.nativeElement.querySelector(`.tab-links[data-tab="${tabName}"]`);
    const targetTabContent = this.el.nativeElement.querySelector(`.tab-contents#${tabName}`);

    if (clickedTabLink) {
      this.renderer.addClass(clickedTabLink, 'active-link');
    }

    if (targetTabContent) {
      this.renderer.addClass(targetTabContent, 'active-tab');
    }
  }

  getCourses(): void {
    this.coursesService.findByTitle(this.searchTerm)
      .subscribe(courses => {
        this.coursesList = courses;
        this.filteredCourses = this.coursesList;
      });
  }
  filterCourses(): any[] {
    if (!this.searchTerm) {
      this.filteredCourses = this.coursesList;
    } else {
      this.filteredCourses = this.coursesList.filter((course: any) =>
        Object.values(course).some(value =>
          value && value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      );
    }
    return this.filteredCourses || []; // Return the filtered courses or an empty array
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