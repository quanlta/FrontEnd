import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../api/services/courses/courses.service';
import { Router } from '@angular/router';

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
  cardItem: any = [];
  currentURL: string;

  constructor(private route: ActivatedRoute, private coursesService: CoursesService, private router: Router) {    this.currentURL = this.router.url;
  }

  ngOnInit(): void {
    this.courseId = +this.route.snapshot.params['id']; // Convert to number using '+'
    this.getCourseDetail();
    let url = this.currentURL;
    let storedCardItem: any = localStorage.getItem('cardItem');
    this.cardItem = JSON.parse(storedCardItem);
  }
  formatCoursePrice(price: number | undefined): string {
    if (price == null) return '';
    // Format the price to include commas and "VNĐ"
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VNĐ';
  }
  
// Method to add course to cart
onAddtoCard(c: any) {
  const cardItem = JSON.stringify(c);

  if (this.cardItem && this.cardItem.length) {
    this.cardItem.push(JSON.parse(cardItem));
  } else {
    this.cardItem = [JSON.parse(cardItem)];
  }

  localStorage.setItem('cardItem', JSON.stringify(this.cardItem));
  window.location.reload()
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
