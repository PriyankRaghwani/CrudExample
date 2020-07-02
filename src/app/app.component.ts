import { Component, VERSION } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from './customer';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent  {

  customers: Customer[] = [
    {Id: Date.now(), FirstName: 'Priyank', LastName: 'Raghwani', Address: 'Chandlodia', Gender: 'Male',BirthDate: new Date(), Email: 'priyank@gmail.com'},
    {Id: Date.now(), FirstName: 'Parth', LastName: 'Raghwani', Address: 'Ghatlodia', Gender: 'Male', BirthDate: new Date(), Email: 'parth@gmail.com'},
    {Id: Date.now(), FirstName: 'Piyush', LastName: 'Raghwani', Address:'Naranpura', Gender: 'Male', BirthDate: new Date(),Email: 'piyush@gmail.com'},
  ];
  displayedColumns: string[];
  customerData;
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder){}

  ngOnInit(){
    this.registrationForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      address: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      birthDate: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
    });

    //customerData = customers;
    this.displayedColumns  = ['firstname', 'lastname', 'address', 'gender', 'birthdate', 'email', 'action'];
    this.customerData = new MatTableDataSource(this.customers);
  }

  registration(){
    if(this.registrationForm.invalid){
      return;
    }
    const customer : Customer = {
      Id: Date.now(),
      FirstName: this.registrationForm.value.firstName,
      LastName: this.registrationForm.value.lastName,
      Address: this.registrationForm.value.address,
      Gender: this.registrationForm.value.gender,
      BirthDate: this.registrationForm.value.birthDate,
      Email: this.registrationForm.value.email,
    };
    this.customers.push(customer);
    const data = this.customerData.data;
    data.push(customer);
    this.customerData = data;
  }

  deleteRecord(email: string){
    console.log(this.customers)
    console.log(email);
    const customer = this.customers.find(x => x.Email === email);
    this.customers.splice(this.customers.indexOf(customer),1);
    //const data = this.customers.data;
    console.log(this.customers);
    this.customerData = this.customers;

  }
}
