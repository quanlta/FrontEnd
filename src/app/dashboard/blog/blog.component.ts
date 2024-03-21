import { Component } from '@angular/core';
import { BlogService } from '../../blog-service.service';
@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  blogs: any[] = [];

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.blogService.getAllBlogs().subscribe(data => {
      this.blogs = data;
    });
  }
}