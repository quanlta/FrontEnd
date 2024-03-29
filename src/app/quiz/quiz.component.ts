import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service'; 
import { Quiz } from '../api/models/auth.model';
import { QuizAnswerResponse } from '../api/models/auth.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class QuizComponent implements OnInit {

  quiz: Quiz = {}; 
  quizId: number = 0; 
  submittedAnswer: string = ''; 
  answerHistory: QuizAnswerResponse[] = []; 
  selectedAnswers: Map<number, string> = new Map<number, string>(); 

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    // Initialize quiz data when component initializes
    this.loadQuiz();
  }

  loadQuiz(): void {
    // Example: Load quiz with ID 279
    this.quizService.getQuiz(279).subscribe(
      (quiz: Quiz) => {
        this.quiz = quiz;
      },
      (error) => {
        console.error('Error loading quiz:', error);
      }
    );
  }
  submitAnswer(): void {
    // Example: Submit answer for quiz with ID 1
    const submitAnswerRequest: any = {
      // Assuming the submittedAnswer is fetched from a form input
      answer: this.submittedAnswer
    };

    this.quizService.submitAnswer(this.quizId, submitAnswerRequest).subscribe(
      (response: any) => {
        console.log('Answer submitted successfully:', response);
        // Reload answer history after submitting answer
        // this.loadAnswerHistory();
      },
      (error) => {
        console.error('Error submitting answer:', error);
      }
    );
  }

  // loadAnswerHistory(): void {
  //   // Example: Load answer history for quiz with ID 1
  //   this.quizService.getAnswerHistory(this.quizId).subscribe(
  //     (history: QuizAnswerResponse[]) => {
  //       this.answerHistory = history;
  //     },
  //     (error) => {
  //       console.error('Error loading answer history:', error);
  //     }
  //   );
  // }
  selectAnswer(questionId: number, answerId: number): void {
    this.selectedAnswers.set(questionId, answerId.toString());
  }
  
}
