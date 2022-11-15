import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Card } from '../Models/card.model';
import { Segment } from '../Models/Segment.model';
import { NameListingService } from '../Services/nameListingService/name-listing.service';

declare let Winwheel: any;
@Component({
  selector: 'app-spinner-section',
  templateUrl: './spinner-section.component.html',
  styleUrls: ['./spinner-section.component.scss'],
})
export class SpinnerSectionComponent implements OnInit {
  theWheel: any;
  nameList!: Card[];
  numSegments!: number;
  segments: Segment[] = [];

  constructor(private nameListingService: NameListingService) {}

  initialiseWheel(): void {
    this.theWheel = new Winwheel({
      numSegments: this.numSegments,
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

  ngOnInit(): void {
    this.nameListingService
      .getAllNames()
      .pipe(
        map((cards) => {
          this.nameList = cards;
          this.numSegments = this.nameList.length;
          this.createSegments();
          this.initialiseWheel();
        })
      )
      .subscribe();
  }

  rotateFunction(): void {
    this.theWheel.startAnimation();
  }
  resetSpinner() {
    this.theWheel.stopAnimation(false);
    this.theWheel.rotationAngle = 0; // Re-set the wheel angle to 0 degrees.
    this.initialiseWheel();
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
}
