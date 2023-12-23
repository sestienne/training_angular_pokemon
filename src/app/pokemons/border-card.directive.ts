import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[pokemonBorderCard]',
  standalone: true
})
export class BorderCardDirective {

  private initialColor: string = '#F5F5F5';
  private defaultColor: string = '#009688';
  private defaultHeight: number = 180;

  constructor(private elem: ElementRef) {
    this.setHeight(this.defaultHeight);
    this.setBorder(this.initialColor);
  }

  @Input('pokemonBorderCard')
  borderColor: string | undefined;

  @HostListener('mouseenter')
  onMouseEnter() {
    this.setBorder(this.borderColor || this.defaultColor);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.setBorder(this.initialColor);
  }

  setHeight(height: number) {
    this.elem.nativeElement.style.height = `${height}px`;
  }

  setBorder(color: string) {
    this.elem.nativeElement.style.border = `solid 4px ${color}`;
  }
}
