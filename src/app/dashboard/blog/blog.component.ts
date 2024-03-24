import { NgxPaginationModule } from 'ngx-pagination';
import { BlogService } from '../../blog-service.service';
import { CategoryService } from '../../api/services/category/category.service';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
<<<<<<< HEAD
import { BlogService } from '../../blog-service.service';
=======
import { CommonModule } from '@angular/common';

>>>>>>> f587f1debac57a0fcc52981fb5c4efbecbff23d6
@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxPaginationModule, ReactiveFormsModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
<<<<<<< HEAD
  blogs: any[] = [];

  constructor(private blogService: BlogService) { }
=======
  blogForm: FormGroup;
  blogs: any[] = [];
  listCategory: any[] = [];
  selectedCategoryId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private blogService: BlogService
  ) {
    this.blogForm = this.fb.group({
      blogDTO: this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        category: this.fb.group({
          categoryId: ['', Validators.required],
          categoryName: ['', Validators.required]
        }),
      }),
      image: File,
    });
  }
>>>>>>> f587f1debac57a0fcc52981fb5c4efbecbff23d6

  ngOnInit() {
    this.blogService.getAllBlogs().subscribe(data => {
      this.blogs = data;
    });
<<<<<<< HEAD
=======
    this.getListCategory();
  }

  getListCategory(): void {
    this.categoryService.getListCategory().subscribe(res => {
      this.listCategory = res;
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.blogForm.patchValue({ image: file }); // Cập nhật giá trị trường image trong form
  }

  onSubmit(): void {
    const blogDTO = this.blogForm.value.blogDTO; // Sử dụng blogDTO chính xác
    const image = this.blogForm.value.image;
    const formData = new FormData();
    formData.append('blogDTO', new Blob([JSON.stringify(blogDTO)], {
      type: 'application/json'
    }));
    if (image) {
      formData.append('image', image);
    }

    // Gửi yêu cầu POST đến server
    this.blogService.createBlog(formData).subscribe(
      response => {
        console.log("BlogDTO:", JSON.stringify(blogDTO));
        console.log("Image:", image);
        console.log("Success:", response);
      },
      error => {
        console.log("Error:", error);
      }
    );
>>>>>>> f587f1debac57a0fcc52981fb5c4efbecbff23d6
  }
}