import { Component, VERSION } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from './customer';
import { MatTableDataSource } from '@angular/material/table';

const customers: Customer[] = [
    {Id: Date.now(), FirstName: 'Priyank', LastName: 'Raghwani', Address: 'Chandlodia', Gender: 'Male',BirthDate: new Date(), Email: 'priyank@gmail.com'},
    {Id: Date.now(), FirstName: 'Parth', LastName: 'Raghwani', Address: 'Ghatlodia', Gender: 'Male', BirthDate: new Date(), Email: 'parth@gmail.com'},
    {Id: Date.now(), FirstName: 'Piyush', LastName: 'Raghwani', Address:'Naranpura', Gender: 'Male', BirthDate: new Date(),Email: 'piyush@gmail.com'},
];

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent  {

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
    this.customerData = new MatTableDataSource(customers);
  }

  registration(){
    if(this.registrationForm.invalid){
      return;
    }
    //console.log(this.registrationForm.controls['email'].value);
    const data = customers.find(x => x.Email === this.registrationForm.controls['email'].value);
    if(data == null){
      const customer : Customer = {
        Id: Date.now(),
        FirstName: this.registrationForm.value.firstName,
        LastName: this.registrationForm.value.lastName,
        Address: this.registrationForm.value.address,
        Gender: this.registrationForm.value.gender,
        BirthDate: this.registrationForm.value.birthDate,
        Email: this.registrationForm.value.email,
      };
      customers.push(customer);
      //const data = this.customerData.data;
      //data.push(customer);
      this.customerData.data = customers;
      //console.log(this.customerData);
    }
    else{
      const customer : Customer = {
        Id: Date.now(),
        FirstName: this.registrationForm.value.firstName,
        LastName: this.registrationForm.value.lastName,
        Address: this.registrationForm.value.address,
        Gender: this.registrationForm.value.gender,
        BirthDate: this.registrationForm.value.birthDate,
        Email: this.registrationForm.value.email,
      };
      customer.Email = this.registrationForm.controls['email'].value;
      //console.log(data);
      //console.log(customers.indexOf(data));
      customers.splice(customers.indexOf(data),1);
      customers.push(customer);
      this.customerData.data = customers;
    }
    this.registrationForm.controls['email'].enable();
    this.registrationForm.reset();
  }

  editRecord(email: string){
    const customer = customers.find(x => x.Email === email);
    //console.log(customer);
    this.registrationForm.patchValue({
      firstName: customer.FirstName,
      lastName: customer.LastName,
      address: customer.Address,
      gender: customer.Gender,
      birthDate: customer.BirthDate,
      email: customer.Email
    });
    this.registrationForm.controls['email'].disable();
  }

  deleteRecord(email: string){
    //console.log(customers)
    //console.log(email);
    const customer = customers.find(x => x.Email === email);
    customers.splice(customers.indexOf(customer),1);
    //const data = this.customers.data;
    //console.log(customers);
    this.customerData.data = customers;
    //console.log(this.customerData);
  }
}
