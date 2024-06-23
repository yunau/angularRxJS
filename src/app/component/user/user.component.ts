import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
// import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../service/user.service';
import { MatTableModule } from '@angular/material/table'; 
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

import moment from 'moment';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDividerModule, MatTableModule, MatFormFieldModule, MatDatepickerModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent implements OnInit {

  userForm!: FormGroup;

  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  // firstnameFormControl = new FormControl('', [Validators.required]);
  // lastnameFormControl = new FormControl('', [Validators.required]);
  // dobFormControl = new FormControl('', [Validators.required]);
  // telephoneFormControl = new FormControl('', [Validators.required]);

  user: User = {
    id: 0,
    firstName: "",
    lastName: "",
    birthday: "",
    telephone: "",
    email: "",
  };
  userId: number = 0;

  constructor(private router: Router, public userservice: UserService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthday: [''],
      telephone: ['']
    });
    this.user = this.userservice.getUser();

    console.log(this.user);

    this.populateForm(this.user);

    console.log(this.userForm);

    this.route.queryParams.subscribe(params => {
      console.log('Route params:', params);
      this.userId = + params['id'];
      console.log('User ID:', params['id']);
    });
   
  }

  populateForm(user: User): void {
    this.userForm?.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      birthday: user.birthday,
      telephone: user.telephone,
      email: user.email
    });
  }

  saveUserInfo() {
    if (this.userForm?.valid) {
      if (this.user.id == 0) { //add new user
        //set a new user id for the new user you are going to add
        this.user.id = this.userservice.listUsers().length + 1;

        //important !!! need to change date format yyyy-mm-dd to input date component
        let tempDob = this.user.birthday;
        let newDob = moment(tempDob).format('DD/MM/YYYY');
        this.user.birthday = newDob;
        
        //save the date to db
        this.userservice.addUser(this.user);

      } else { //edit & save user

        //important !!! need to change date format yyyy-mm-dd to input date component
        // let tempDob = this.user.birthday;
        //let newDob = moment(tempDob).format('DD/MM/YYYY');
        // this.user.birthday = newDob;

        //save the date to db
        this.userservice.editUser(this.user);
        
        this.user.id = undefined;
        this.user.birthday = new Date(this.user.birthday).toISOString();
        console.log(this.user);
        this.userservice.registerUser(this.user).subscribe({
          next: (v) => console.log(v),
          error: (e) => console.error(e),
          complete: () => console.info('complete') 
        });

      }

      // this.userservice.getUsers().pipe(
      //   tap(users => console.log('Original users:', users)),
      //   map(users => users.filter(user => user.isActive)),
      //   tap(users => console.log('Filtered active users:', users)),
      //   map(users => users.sort((a, b) => a.name.localeCompare(b.name))),
      //   tap(users => console.log('Sorted users:', users)),
      //   catchError(error => {
      //     console.error('Error occurred:', error);
      //     return throwError(error);
      //   })
      // ).subscribe(
      //   users => console.log('Final users:', users),
      //   error => console.error('Subscription error:', error)
      // );

      this.router.navigateByUrl('/userlist'); 
    }
  }

  backUserList() { 
    this.router.navigateByUrl('/userlist');
  }

}
