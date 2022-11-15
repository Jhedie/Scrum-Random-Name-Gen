import { Injectable } from '@angular/core';
import { Card } from 'src/app/Models/card.model';
import { Segment } from 'src/app/Models/Segment.model';
declare let Winwheel: any;
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
      animation: {
        type: 'spinToStop', // Type of animation.
        duration: 5, // How long the animation is to take in seconds.
        spins: 10, // The number of complete 360 degree rotations the wheel is to do.
        callbackFinished: 'getVolunteer(this)',
        callbackAfter: 'finished(this)',
      },
    });

    this.theWheel.drawInitialTriangle();
  }

  createSegments() {
    const colourPallete: string[] = [
      '#8E3B46',
      '#9E7676',
      '#EDDBC0',
      '#8BBCCC',
      '#DFD3C3',
      '#AEBDCA',
      '#90B77D',
      '#EBC7E8',
    ];
    this.segments = this.nameList.map((card, index) => ({
      text: card.name,
      fillStyle: colourPallete[index],
    }));
  }

  getNumberOfSegments(): number {
    return this.segments.length;
  }

  resetWheel() {
    this.theWheel.stopAnimation(false);
    this.theWheel.rotationAngle = 0; // Re-set the wheel angle to 0 degrees.
    this.createSegments();
  }

  spinWheel() {
    this.theWheel.startAnimation();
  }
}
