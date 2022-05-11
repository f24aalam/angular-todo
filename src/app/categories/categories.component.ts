import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  addingCategories = false;
  categories: any[] = [];

  constructor(public readonly categoryService: CategoryService) { }

  async ngOnInit() {
    const {data, error} = await this.categoryService.categories;

    if (error) {
      alert(error);
      return;
    }

    this.categories = data;
  }

  async addCategory(name: string) {
    this.addingCategories = true;
    const { data, error } = await this.categoryService.add(name);
    this.addingCategories = false;

    if (error) {
      alert(error);
    }
  }

}
