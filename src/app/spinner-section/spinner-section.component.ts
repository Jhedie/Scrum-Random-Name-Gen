import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Card } from '../Models/card.model';
import { Segment } from '../Models/Segment.model';

declare let Winwheel: any;
@Component({
  selector: 'app-spinner-section',
  templateUrl: './spinner-section.component.html',
  styleUrls: ['./spinner-section.component.scss'],
})
export class SpinnerSectionComponent implements OnInit, AfterViewInit {
  theWheel: any;
  nameList!: Card[];
  numSegments!: number;
  segments: Segment[] = [];

  constructor() {}
  ngAfterViewInit(): void {
    this.theWheel = new Winwheel({
      numSegments: this.numSegments,
      segments: this.segments,
      fillStyle: '#FFFFFF',
      // Note animation properties passed in constructor parameters.
      animation: {
        type: 'spinToStop', // Type of animation.
        duration: 5, // How long the animation is to take in seconds.
        spins: 8, // The number of complete 360 degree rotations the wheel is to do.
      },
    });
  }

  ngOnInit(): void {
    this.nameList = JSON.parse(localStorage.getItem('storedCards') || '') || [];
    this.numSegments = this.nameList.length;
    this.createSegments();
  }

  rotateFunction(): void {
    this.theWheel.startAnimation();
  }
  resetSpinner() {
    this.theWheel.stopAnimation(false);
    this.theWheel.rotationAngle = 0; // Re-set the wheel angle to 0 degrees.
    this.theWheel.draw();
  }

  createSegments() {
    let colourPallete: string[] = [
      '#8E3B46',
      '#9E7676',
      '#EDDBC0',
      '#8BBCCC',
      '#DFD3C3',
      '#AEBDCA',
      '#90B77D',
      '#EBC7E8',
    ];
    this.nameList.forEach((card) => {
      console.log(card);
      this.segments.push({
        text: card.name,
        fillStyle: colourPallete[card.id],
      });
    });
  }
}
