import { Component } from '@angular/core';
import { teacher } from '../../data';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css'
})
export class IncomeComponent {
  teacherList: any;
  ngOnInit() {
    this.teacherList = teacher;
  }
}
