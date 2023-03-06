import { Component, OnInit } from '@angular/core';
import { map, Subscription, tap } from 'rxjs';
import { Card } from '../Models/card.model';
import { Segment } from '../Models/Segment.model';
import { NameListingService } from '../Services/nameListingService/name-listing.service';
import { WheelService } from '../Services/WheelService/wheel.service';

@Component({
  selector: 'app-spinner-section',
  templateUrl: './spinner-section.component.html',
  styleUrls: ['./spinner-section.component.scss'],
})
export class SpinnerSectionComponent implements OnInit {
  nameList!: Card[];

  protected subscriptions = new Subscription();
  constructor(
    private nameListingService: NameListingService,
    private wheelService: WheelService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.nameListingService
        .getAllNames()
        .pipe(
          map((cards) => {
            this.wheelService.createWheel(cards);
          })
        )
        .subscribe()
    );
  }

  rotateFunction(): void {
    this.wheelService.spinWheel();
  }
  resetSpinner() {
    this.wheelService.resetWheel();
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
