import { Component, TemplateRef, ViewChild } from '@angular/core';
import {trigger,transition,animate,state,query,style, keyframes} from '@angular/animations';
import {GameService} from "../service/game.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations:[
    trigger('increDecre',[
      transition(':increment',[
        query(':enter',[
          style({width:'20%',opacity:0}),
          animate('1000ms ease-out',style({
            width:'*',opacity:'*'}))
        ],{optional:true})
      ]),
      transition(':decrement',[
        query(':leave',[
          animate('1000ms ease-in-out',style({
            width:'0%',opacity:0}))
        ],{
          optional:true
        })
      ])
  ]),
  trigger('highlightIncorrect', [
    transition('* => true', [
      query('.btn-incorrect', [
        style({ backgroundColor: 'red' }),
        animate('300ms ease-out', style({ backgroundColor: '*' })),
      ]),
    ]),
  ]),
  trigger('stripeAnimation', [
    transition('* => *', [
      animate('5s', keyframes([
        style({ backgroundPosition: '200%', offset: 0 }),
        style({ backgroundPosition: '0%', offset: 1 })
      ]))
    ])
  ])
  ]
})
export class GameComponent{

  @ViewChild('congratsModal') congratsModal: TemplateRef<any>;
  @ViewChild('gameOverModal') gameOverModal: TemplateRef<any>;
  num1: number;
  num2: number;
  num3: number;
  operator1: string;
  operator2: string;
  correctAnswer: number;
  answerOptions: number[];
  showWrongAnswerMessage: boolean = false;
  optionClickedIndex: number=-1;
  life:number=3;
  heartsArray: any[];
  level:number=1;
  startingProgress: number = 0;
  currentProgress: number = this.startingProgress; 


  constructor(private gameService: GameService,
    private modalService:NgbModal,
    private route:Router) {
    this.generateQuestion();
    this.updateHeartsArray();
  }


  getProgressValue(): number {
    return this.currentProgress;
  }

  getProgressWidth(): string {
    return `${this.getProgressValue()}%`;
  }

  updateHeartsArray(): void {
    this.heartsArray = Array(this.life).fill(0);
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
      this.modalService.open(this.congratsModal,{centered:true,backdrop:'static'})
    
    } else {
      this.showWrongAnswerMessage = true;
      this.optionClickedIndex= selectIndex;
      this.life--;
      this.updateHeartsArray();

      if (this.life === 0) {
        this.modalService.open(this.gameOverModal, { centered: true, backdrop: 'static' });
      } else {
        setTimeout(() => {
          this.showWrongAnswerMessage = false;
          this.removeAnswerOption(selectIndex);
          this.optionClickedIndex = -1;
        }, 1000);
      }
    }
  }
  continueGame(): void {
    this.modalService.dismissAll(); // Close the modal
    this.generateQuestion();
    this.level += 1;
    this.currentProgress +=5
  }

  goToHome(): void {
    this.modalService.dismissAll(); // Close the modal
    this.route.navigate(['/home']); // Navigate to the home page
  }
  restartGame(): void {
    this.modalService.dismissAll(); 
    this.showWrongAnswerMessage = false;
    this.level=1;
    this.life = 3; // Reset life
    this.generateQuestion(); // Generate a new question to restart the game
    this.updateHeartsArray(); // Update heartsArray
  }

  private shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }


}
