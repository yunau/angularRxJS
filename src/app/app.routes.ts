

import { Routes } from '@angular/router';
import { UserComponent } from './component/user/user.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { HomeComponent } from './component/home/home.component';
import { StudyComponent } from './component/study/study.component';

export const routes: Routes = [
  { path: 'userlist', component: UserListComponent,  title: 'User List'},
  { path: 'user', component: UserComponent,  title: 'User Detail'},
  { path: 'home', component: HomeComponent,  title: 'Home'},
  { path: 'study', component: StudyComponent,  title: 'Study'}
];
