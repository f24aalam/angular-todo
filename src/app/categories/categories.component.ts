import { Component, OnInit } from '@angular/core';
import { Category, CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  addingCategories = false;
  categories: any[] = [];

  constructor(public readonly categoryService: CategoryService) { }

  ngOnInit() {
    this.fetchCategories();
  }

  async fetchCategories() {
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
    this.fetchCategories();
    this.addingCategories = false;

    if (error) {
      alert(error);
    }
  }

  async editCategory(name: string, category: Category) {
    category.saving = true;
    const { data, error } = await this.categoryService.update(name, category)

    category.saving = false;

    if (error) {
      alert(error);
      return;
    }

    category.name = name;
    category.editing = false;
  }

  enableEditMode(category: Category) {
    category.editing = true;
  }

  disableEditMode(category: Category) {
    category.editing = false;
  }
}
