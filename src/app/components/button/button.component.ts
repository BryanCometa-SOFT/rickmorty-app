import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

    /* Inputs */
    @Input() color: 'primary' | 'accent' | 'warn' | 'basic' | 'link';
    @Input() label: string;
    @Input() disabled: boolean;
    @Input() class: string;
  
    /* Output */
    @Output() outputClick: EventEmitter<boolean>;

  public constructor() {
    /* Inputs: valores iniciales */
    this.color = 'primary';
    this.disabled = false;
    this.label = "";
    this.class = "";

    /* Output: valores iniciales */
    this.outputClick = new EventEmitter<boolean>();
  }

  ngOnInit(): void {}
}
