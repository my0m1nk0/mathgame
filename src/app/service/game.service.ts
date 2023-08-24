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
    const usedIncorrectAnswers = new Set();

    for (let i = 0; i < 3; i++) {
      let incorrectAnswer;
      do {
        const offset = this.generateRandomNumber(1, 8);
        incorrectAnswer = correctAnswer + offset;
      } while (usedIncorrectAnswers.has(incorrectAnswer)); 

      usedIncorrectAnswers.add(incorrectAnswer);
      incorrectAnswers.push(incorrectAnswer);
    }

    return incorrectAnswers;
  }
}
