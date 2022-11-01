import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

declare let Winwheel: any;
@Component({
  selector: 'app-spinner-section',
  templateUrl: './spinner-section.component.html',
  styleUrls: ['./spinner-section.component.scss'],
})
export class SpinnerSectionComponent implements OnInit, AfterViewInit {
  theWheel: any;
  nameList: [] = JSON.parse(localStorage.getItem('storedCards') || '');
  numSegments: number = this.nameList.length;

  constructor(private renderer: Renderer2, private el: ElementRef) {}
  ngAfterViewInit(): void {
    this.theWheel = new Winwheel({ numSegments: this.numSegments });
  }
  ngOnInit(): void {
    console.log(this.nameList, this.numSegments);
  }

  rotateFunction(): void {}
}
