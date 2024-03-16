import { Component } from '@angular/core';
import { teacher } from '../../data';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  teacherList: any;
  ngOnInit() {
    this.teacherList = teacher;
  }
}
