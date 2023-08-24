import { Component } from '@angular/core';
import {GameService} from "../service/game.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent{
  num1: number;
  num2: number;
  num3: number;
  operator1: string;
  operator2: string;
  correctAnswer: number;
  answerOptions: number[];
  showWrongAnswerMessage: boolean = false;

  constructor(private gameService: GameService) {
    this.generateQuestion()
  }


  generateQuestion(): void {
    this.num1 = this.gameService.generateRandomNumber(1, 9);
    this.num2 = this.gameService.generateRandomNumber(1, 9);
    this.num3 = this.gameService.generateRandomNumber(1, 9);
    this.operator1 = this.gameService.generateRandomOperator();
    this.operator2 =this.gameService.generateRandomOperator();
    const rawCorrectAnswer = eval(`${this.num1} ${this.operator1}${this.num2}${this.operator2}${this.num3}`);
    this.correctAnswer = parseFloat(rawCorrectAnswer.toFixed(2));
    this.answerOptions = this.gameService.generateIncorrectAnswers(this.correctAnswer);
    this.answerOptions = this.answerOptions.map(option => {
      return Number.isInteger(option) ? option : parseFloat(option.toFixed(2));
    });
    this.answerOptions.push(this.correctAnswer);

    this.shuffleArray(this.answerOptions);
  }
  removeAnswerOption(index: number): void {
    this.answerOptions.splice(index, 1);
  }
  checkAnswer(selectedAnswer: number,selectIndex:number): void {
    if (selectedAnswer === this.correctAnswer) {
      this.showWrongAnswerMessage = false;
    } else {
      this.showWrongAnswerMessage = true;
      setTimeout(() => {
        this.showWrongAnswerMessage = false;
        this.removeAnswerOption(selectIndex)
      }, 1000);
    }
  }

  private shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

}
