import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent {
  selectArray: string[] = [];
  result = ['javascript', 'true', 'alert', 'function2', 'call3', 'if1', 'if4'];
  count = 0;

  submitQuiz() {
    this.count = 0;
    this.selectArray = [];

    this.addToSelectArray('quiz1');
    this.addToSelectArray('quiz2');
    this.addToSelectArray('quiz3');
    this.addToSelectArray('quiz4');
    this.addToSelectArray('quiz5');
    this.addToSelectArray('quiz6');
    this.addToSelectArray('quiz7');


    if (this.selectArray.length !== 7) {-
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please answer all the questions',
        customClass:'popupswal'
      });
      return;
    }

    for (let i = 0; i < this.result.length; i++) {
      if (this.result[i] === this.selectArray[i]) {
        this.count++;
      }
    }

    Swal.fire({
      title: `Your Score is: ${this.count}/${this.result.length}`,
      imageUrl: 'https://i.postimg.cc/Vk9R4fWY/cong.png',
      width: 600,
      padding: '3em',
      color: '#716add',
      background: '#fff url()',
      backdrop: `
        rgba(0,0,123,0.4)
        url("https://i.ibb.co/Hdq1F7G/running-Cat.gif")
        left top
        no-repeat
      `,
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });

  }

  private addToSelectArray(quizName: string) {
    let quiz = document.getElementsByName(quizName);
    for (let i = 0; i < quiz.length; i++) {
      if ((quiz[i] as HTMLInputElement).checked) {
        this.selectArray.push((quiz[i] as HTMLInputElement).value);
      }
    }
  }
}
