import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../api/services/courses/courses.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// Define the Course interface
interface Course {
  courseId: number;
  courseTitle: string;
  courseDescription: string;
  coursePrice: number;
  category: string | null;
  isPassed: boolean;
  courseDate: string;
  ratings: number | null;
  level: string;
  tag: string;
  userId: number | null;
  learningDetail: LearningDetail;
  image: string | null;
  videoTrial: string | null;
  status: number;
  sections: Section[];
  avgRating: number;
  countRating: number;
  categoryName: string;
}

interface LearningDetail {
  benefit: string;
  objective: string;
}

interface Section {
  sectionId: number;
  sectionName: string;
  course: any; // It might be better to define a Course reference type here
  articles: Article[];
  videos: Video[];
  quizzes: Quiz[];
}

interface Article {
  articleId: number;
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
  quizId: number;
  title: string;
  questions: Question[];
}

interface Question {
  questionId: number;
  text: string;
  point: number;
  answers: Answer[];
}

interface Answer {
  answerId: number;
  text: string;
  isCorrect: boolean;
}

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styleUrls: ['./courses-detail.component.css'],
  imports: [CommonModule],
  standalone: true
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
      const courseDetail: Course = {
        courseId: data.courseID,
        courseTitle: data.courseTitle,
        courseDescription: data.courseDes,
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
        sections: data.sections.map((sectionData: any) => {
          const section: Section = {
            sectionId: sectionData.sectionId,
            sectionName: sectionData.sectionName,
            course: null, // You might need to assign the course reference here
            articles: sectionData.articles.map((articleData: any) => ({
              articleId: articleData.articleID,
              title: articleData.title,
              articleUrl: articleData.articleUrl
            })),
            videos: sectionData.videos.map((videoData: any) => ({
              videoId: videoData.videoId,
              title: videoData.title,
              description: videoData.description,
              videoData: videoData.videoData,
              isTrial: videoData.isTrial
            })),
            quizzes: sectionData.quizzes.map((quizData: any) => ({
              quizId: quizData.id,
              title: quizData.title,
              questions: quizData.questions.map((questionData: any) => ({
                questionId: questionData.id,
                text: questionData.text,
                point: questionData.point,
                answers: questionData.answers.map((answerData: any) => ({
                  answerId: answerData.id,
                  text: answerData.text,
                  isCorrect: answerData.correct
                }))
              }))
            }))
          };
          return section;
        }),
        avgRating: data.avgRating,
        countRating: data.countRating,
        categoryName: data.categoryName
      };
      this.courseDetail = courseDetail;
      console.log('Course Detail:', this.courseDetail);
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}
  
  
}
