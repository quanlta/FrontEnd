import {
  Component,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CoursesService } from '../../api/services/courses/courses.service';
import { ElementRef, Renderer2 } from '@angular/core';
import { CategoryService } from '../../api/services/category/category.service';
import { AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxPaginationModule, ReactiveFormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent {
  showCreateForm: boolean = false;
  courseForm: FormGroup;
  coursesList: any[] = [];
  filteredCourses: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  activeTab: any = 'tab1';
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private coursesService: CoursesService, private renderer: Renderer2, private el: ElementRef) {
    this.courseForm = this.fb.group({
      articleFiles: [''],
      videoFiles: [''],
      videoTrial: [''],
      imageFile: [''],
      courseDTO: this.fb.group({
        courseTitle: ['', Validators.required],
        courseDes: ['', Validators.required],
        coursePrice: [null, Validators.required],
        category: this.fb.group({
          categoryId: [null, Validators.required],
          categoryName: ['', Validators.required]
        }),
        courseDate: ['', Validators.required],
        level: ['', Validators.required],
        tag: [''],
        learningDetail: this.fb.group({
          objective: [''],
          benefit: ['']
        }),
        status: [1, Validators.required],
        sections: this.fb.array([])
      })
    });
  }
  ngOnInit(): void {
    this.addSection();
    this.route.params.subscribe(params => {
      this.searchTerm = params['searchTerm'];
      this.getCourses();
    });
  }
  
  get sections(): FormArray {
    return this.courseForm.get('sections') as FormArray;
  }


  addSection(): void {
    const sections = this.courseForm.get('sections') as FormArray;
    if (sections) {
      sections.push(this.fb.group({
        sectionName: ['', Validators.required],
        articles: this.fb.array([]),
        videos: this.fb.array([]),
        quizzes: this.fb.array([this.createQuiz()])
      }));
    }
  }

  createQuiz(): FormGroup {
    return this.fb.group({
      quizTitle: ['Quiz', Validators.required],
      questions: this.fb.array([this.createQuestion()])
    });
  }

  createQuestion(): FormGroup {
    return this.fb.group({
      questionText: ['', Validators.required],
      point: [null, Validators.required],
      answerDTOs: this.fb.array([
        this.createAnswer(false),
        this.createAnswer(true)
      ])
    });
  }

  createAnswer(isCorrect: boolean): FormGroup {
    return this.fb.group({
      answerText: ['', Validators.required],
      isCorrect: [isCorrect]
    });
  }

  addArticle(sectionIndex: number, title: string): void {
    const articles = this.sections.at(sectionIndex).get('articles') as FormArray;
    articles.push(this.fb.group({
      title: [title, Validators.required] // Use the provided title
    }));
  }

  addVideo(sectionIndex: number, title: string): void {
    const videos = this.sections.at(sectionIndex).get('videos') as FormArray;
    videos.push(this.fb.group({
      title: [title, Validators.required] // Use the provided title
    }));
  }

  onFileSelected(event: any, field: string): void {
    if (event.target.files && event.target.files.length) {
      const files = event.target.files;
      const fileNames = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        fileNames.push(file.name);
        if (field === 'videoFiles') {
          this.addVideo(this.sections.length - 1, file.name); // Add video with file name as title
        } else if (field === 'articleFiles') {
          this.addArticle(this.sections.length - 1, file.name);
        }
      }
      this.courseForm.patchValue({ [field]: fileNames });
    }
  }
  getArticleControls(sectionIndex: number): AbstractControl[] {
    const articles = this.sections.at(sectionIndex).get('articles') as FormArray;
    return articles.controls;
  }
  getVideoControls(sectionIndex: number): AbstractControl[] {
    const videos = this.sections.at(sectionIndex).get('videos') as FormArray;
    return videos.controls;
  }
  onSubmit(): void {
    const formData = new FormData();
    Object.keys(this.courseForm.value).forEach(key => {
      if (Array.isArray(this.courseForm.value[key])) {
        const files = this.courseForm.value[key] as FileList;
        for (let i = 0; i < files.length; i++) {
          formData.append(key, files[i]);
        }
      } else {
        formData.append(key, this.courseForm.value[key]);
      }
    });

    this.coursesService.create(formData).subscribe(response => {
      // Handle response
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