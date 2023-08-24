import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  generateRandomOperator(): string {
    const operators = ['+', '-', '*', '/'];
    const randomIndex = this.generateRandomNumber(0, operators.length - 1);
    return operators[randomIndex];
  }

  generateIncorrectAnswers(correctAnswer: number): number[] {
    const incorrectAnswers = [];
    for (let i = 0; i < 3; i++) {
      const offset = this.generateRandomNumber(1, 8);
      const incorrectAnswer = correctAnswer + offset;
      incorrectAnswers.push(incorrectAnswer);
    }
    return incorrectAnswers;
  }
}
