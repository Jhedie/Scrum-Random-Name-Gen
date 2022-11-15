import { Injectable } from '@angular/core';
import { Card } from 'src/app/Models/card.model';
import { Segment } from 'src/app/Models/Segment.model';

declare let Winwheel: any;
declare let Animation: any;
@Injectable({
  providedIn: 'root',
})
export class WheelService {
  theWheel: any;
  segments: Segment[] = [];
  nameList!: Card[];

  createWheel(names: Card[]): void {
    this.nameList = names;
    this.createSegments();
    this.theWheel = new Winwheel({
      numSegments: this.getNumberOfSegments(),
      segments: this.segments,
      fillStyle: '#FFFFFF',
      outerRadius: 225,
      rotationAngle: -30,
      animation: this.getWheelAnimation(),
    });

    this.theWheel.drawInitialTriangle();
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getWheelAnimation(): Animation {
    const randomDuration = this.getRandomInt(5, 10);
    const randomSpinNumber = this.getRandomInt(5, 10);
    const randomDirection = !!this.getRandomInt(0, 1)
      ? 'clockwise'
      : 'anti-clockwise';
    const animation = new Animation({
      type: 'spinToStop', // Type of animation.
      duration: randomDuration, // How long the animation is to take in seconds.
      spins: randomSpinNumber, // The number of complete 360 degree rotations the wheel is to do.
      callbackFinished: 'getVolunteer(this)',
      callbackAfter: 'finished(this)',
      direction: randomDirection, // clockwise or anti-clockwise.
    });
    return animation;
  }

  createSegments(): void {
    const colourPallete: string[] = [
      '#66c2a5',
      '#f46d43',
      '#fdae61',
      '#fee08b',
      '#e6f598',
      '#abdda4',
      '#3288bd',
      '#d53e4f',
    ];
    this.segments = this.nameList.map((card, index) => ({
      text: card.name,
      fillStyle: colourPallete[index],
    }));
  }

  getNumberOfSegments(): number {
    return this.segments.length;
  }

  resetWheel(): void {
    this.theWheel.stopAnimation(false);
    this.theWheel.rotationAngle = 0; // Re-set the wheel angle to 0 degrees.
    this.createWheel(this.nameList);
  }

  spinWheel(): void {
    this.theWheel.startAnimation();
  }
}
