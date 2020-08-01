import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  public page_title: string;

  constructor() {
    this.page_title = 'Categories';
   }

  ngOnInit(): void {
  }

}
