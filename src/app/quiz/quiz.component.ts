import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../api/services/quiz/quiz.service';

interface Quiz {
  quizId: number;
  quizTitle: string;
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
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizId: any;
  quizData: Quiz | null = null;

  constructor(private quizService: QuizService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.quizId = +params['id'];
      this.getQuiz();
    });
  }

  getQuiz(): void {
    this.quizService.getQuiz(this.quizId).subscribe(
      (data: Quiz) => {
        this.quizData = data;
      },
      error => {
        console.error('Failed to get quiz data:', error);
      }
    );
  }

  submitAnswer(questionId: number, answerId: number): void {
    const answerData = {
      quizId: this.quizId,
      answerRequests: [{ questionId, answerId }],
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString()
    };
    this.quizService.submitAnswer(this.quizId, answerData).subscribe(
      (response) => {
        console.log("Answer submitted successfully:", response);
        console.log("Quiz: ", this.quizData);
      },
      (error) => {
        console.error("Failed to submit answer:", error);
      }
    );
  }

  getAnswerHistory(): void {
    this.quizService.getAnswerHistory(this.quizId).subscribe(
      (response) => {
        console.log("Answer history:", response);
      },
      (error) => {
        console.error("Failed to get answer history:", error);
      }
    );
  }
}
