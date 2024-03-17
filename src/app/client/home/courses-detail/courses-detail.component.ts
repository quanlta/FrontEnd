import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../api/services/courses/courses.service';

// Define the Course interface
interface Course {
  courseID: number;
  courseTitle: string;
  courseDes: string;
  coursePrice: number;
  category: any;
  isPassed: boolean;
  courseDate: string;
  ratings: any;
  level: string;
  tag: string;
  userId: any;
  learningDetail: {
    benefit: string;
    objective: string;
  };
  image: any;
  videoTrial: any;
  status: number;
  sections: Section[];
  avgRating: number;
  countRating: number;
  categoryName: string;
}

// Define the Section interface
interface Section {
  sectionId: number;
  sectionName: string;
  course: any;
  articles: Article[];
  videos: Video[];
  quizzes: Quiz[];
}

interface Article {
  articleID: number;
  title: string;
  articleUrl: string;
}

interface Video {
  videoId: number;
  title: string;
  description: string;
  videoData: string;
  isTrial: boolean;
}

interface Quiz {
  id: number;
  title: string;
  questions: Question[];
}

interface Question {
  id: number;
  text: string;
  point: number;
  answers: Answer[];
}

interface Answer {
  id: number;
  text: string;
  correct: boolean;
}

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styleUrls: ['./courses-detail.component.css'],
})
export class CoursesDetailComponent implements OnInit {
  courseId: number = 0;
  courseDetail: Course | null = null; // Fix typo here
  courseList: any;

  constructor(private route: ActivatedRoute, private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.courseId = +this.route.snapshot.params['id']; // Convert to number using '+'
    this.getCourseDetail();
  }
  getCourseDetail(): void {
    this.coursesService.getCourseDetail(this.courseId).subscribe(
      (data: any) => {
        this.courseDetail = {
          courseID: data.courseID,
          courseTitle: data.courseTitle,
          courseDes: data.courseDes,
          coursePrice: data.coursePrice,
          category: data.category,
          isPassed: data.isPassed,
          courseDate: data.courseDate,
          ratings: data.ratings,
          level: data.level,
          tag: data.tag,
          userId: data.userId,
          learningDetail: {
            benefit: data.learningDetail.benefit,
            objective: data.learningDetail.objective,
          },
          image: data.image,
          videoTrial: data.videoTrial,
          status: data.status,
          sections: data.sections,
          avgRating: data.avgRating,
          countRating: data.countRating,
          categoryName: data.categoryName,
        };
        console.log('Course Detail:', this.courseDetail);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  
  
}
