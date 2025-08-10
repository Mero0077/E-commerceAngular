import { Component, EventEmitter, Input, input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})

export class SelectComponent {
  @Input() title: string = '';
  @Input() data: string[] = [];
  @Output() selectedValue = new EventEmitter<string>();

  detectchanges(event: Event) {
    const selected = (event.target as HTMLSelectElement).value;
    this.selectedValue.emit(selected);
  }
}

