import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import moment from 'moment';
import { MatTableModule } from '@angular/material/table'; 
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [ CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatDividerModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  screenWidth: number = 0;
  screenHeight: number = 0;
  user: User = {
    id: 0,
    firstName: "",
    lastName: "",
    birthday: "",
    telephone: "",
    email: "",
  };

  userlist: User[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'birthday'];
  dataSource = new MatTableDataSource<User>(this.userservice.listUsers());
  selection = new SelectionModel<User>(false, []);

  @HostListener("window:resize", [])
  private onResize() {
    this.detectScreenSize();
  }

  private detectScreenSize() {
    this.screenWidth = window.screen.width;
    this.screenHeight = window.screen.height;
  }

  ngAfterViewInit() { }

  constructor(private router: Router, public userservice: UserService) { 
    this.screenWidth = window.screen.width;
    this.screenHeight = window.screen.height;
  }

  addNewUser() {
    this.userservice.setUser(this.user); 
    this.router.navigateByUrl('/user');
  }

  editNewUser() {
    let selected_user = this.selection.selected[0];
    //important !!! need to change date format yyyy-mm-dd to input date component
    let tempDob = selected_user.birthday;
    let newDob = moment(tempDob, 'DD/MM/YYYY').format('YYYY-MM-DD');
    selected_user.birthday = newDob;
    this.userservice.setUser(selected_user); 
    // this.router.navigateByUrl('/user/' + selected_user.id);
    this.router.navigate(['/user'], { queryParams: { id: selected_user.id } }); 
  }

}
