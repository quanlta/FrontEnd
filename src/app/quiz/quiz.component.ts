import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Quiz } from '../api/models/auth.model';
import { QuizAnswerResponse } from '../api/models/auth.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../api/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('accessToken');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class QuizComponent implements OnInit {
  quiz: Quiz = {};
  quizId: number = 0;
  submittedAnswer: string = '';
  answerHistory: QuizAnswerResponse[] = [];
  selectedAnswers: Map<number, string> = new Map<number, string>();
  totalPoints: number = 0;
  constructor(private route: ActivatedRoute, private quizService: QuizService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.quizId = +params['quizId'];
      this.loadQuiz();
    });
  }

  loadQuiz(): void {
    this.quizService.getQuiz(this.quizId).subscribe(
      (quiz: Quiz) => {
        this.quiz = quiz;
      },
      (error) => {
        console.error('Error loading quiz:', error);
      }
    );
  }

  submitAnswer(): void {
    const startTime = new Date();
    const endTime = new Date();

    const answerRequest: any = {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      answers: []
    };

    this.selectedAnswers.forEach((answerId, questionId) => {
      answerRequest.answers.push({
        questionId: questionId,
        answerId: answerId
      });
    });

    this.quizService.submitAnswer(this.quizId, answerRequest).subscribe(
      (response: any) => {
        console.log('Answer submitted successfully:', response);
        console.log('Answer:', answerRequest);
        this.loadAnswerHistory();
      },
      (error) => {
        console.error('Error submitting answer:', error);
      }
    );
  }

  loadAnswerHistory(): void {
    this.quizService.getAnswerHistory(this.quizId).subscribe(
      (history: QuizAnswerResponse[]) => {
        console.log('Quiz answer response:', history);
        this.answerHistory = history;
      },
      (error) => {
        console.error('Error loading answer history:', error);
      }
    );
  }

  selectAnswer(questionId: number, answerId: number): void {
    this.selectedAnswers.set(questionId, answerId.toString());
  }
}
