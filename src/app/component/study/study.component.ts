import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { MatTableModule } from '@angular/material/table'; 
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-study',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatFormFieldModule, MatDatepickerModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './study.component.html',
  styleUrl: './study.component.css'
})
export class StudyComponent implements OnInit {

  items: string[] = ['Bread', 'Eggs', 'Milk'];

  trackByFn(index: number, item: any): number {
    return index;
  }

  ngOnInit(): void {

  }

}
