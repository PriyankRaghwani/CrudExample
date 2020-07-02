import { Component, VERSION, Input } from '@angular/core';
import { Customer } from './Customer';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: [ './data.component.css' ]
})

export class DataComponent{
  
  @Input() customer: Customer;
  constructor() {}

  ngOnInit(){
    
  }
}