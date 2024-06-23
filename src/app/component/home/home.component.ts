import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { MatTableModule } from '@angular/material/table'; 
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatFormFieldModule, MatDatepickerModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  items: string[] = ['Bread', 'Eggs', 'Milk'];

  trackByFn(index: number, item: any): number {
    return index; // or item.id if your items have unique ids
  }
}
