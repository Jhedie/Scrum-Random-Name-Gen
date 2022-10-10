import { animation } from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
@Component({
  selector: 'app-spinner-section',
  templateUrl: './spinner-section.component.html',
  styleUrls: ['./spinner-section.component.scss'],
})
export class SpinnerSectionComponent implements OnInit, AfterViewInit {
  SLOTS_PER_REEL = 12; //ratio = 1:12.5
  REEL_RADIUS = 150;
  @ViewChild('mainRing') mainRing!: ElementRef;

  constructor(private renderer: Renderer2, private el: ElementRef) {}
  ngAfterViewInit(): void {
    this.createSlots(this.mainRing);
  }
  ngOnInit(): void {}

  createSlots(ring: ElementRef) {
    let slotAngle = 360 / this.SLOTS_PER_REEL;

    let seed = this.getSeed();

    for (let i: number = 0; i < this.SLOTS_PER_REEL; i++) {
      let slot = this.renderer.createElement('div');
      this.renderer.addClass(slot, 'slot');

      // compute and assign the transform for this slot
      let transform: string =
        'rotateX(' +
        slotAngle * i +
        'deg) translateZ(' +
        this.REEL_RADIUS +
        'px)';

      this.renderer.setStyle(slot, 'transform', transform);

      // setup the number to show inside the slot
      // the position is randomized to
      let slotContent = this.renderer.createText(
        `${(seed + i) % this.SLOTS_PER_REEL}`
      );
      let slotContentParagraph = this.renderer.createElement('p');
      this.renderer.appendChild(slotContentParagraph, slotContent);
      this.renderer.appendChild(slot, slotContentParagraph);
      // add the poster to the row
      this.renderer.appendChild(ring.nativeElement, slot);
    }
  }

  getSeed(): number {
    // generate random number smaller than 13 then floor it to settle between 0 and 12 inclusive
    return Math.floor(Math.random() * this.SLOTS_PER_REEL);
  }

  spin(timer: number) {
    this.renderer.setStyle(
      this.mainRing.nativeElement,
      'animation',
      `back-spin 1s, spin ${timer * 0.5}s'`
    );
    this.renderer.addClass(this.mainRing.nativeElement, 'spin');
  }

  rotateFunction(): void {
    let timer: number = 2;
    this.spin(timer);
  }
}
