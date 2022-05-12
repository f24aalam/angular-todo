import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Category, CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  addingCategory = false;
  deletingCategory = false;
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
    this.addingCategory = true;
    const { data, error } = await this.categoryService.add(name);
    this.fetchCategories();
    this.addingCategory = false;

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

  async deleteCategory(category: Category) {
    Swal.fire({
      title: 'Deleting...',
      didOpen: async () => {
        Swal.showLoading();
        const {data, error} = await this.categoryService.delete(category);
        Swal.close();

        if (error) {
          console.log(error);
          return
        }

        this.fetchCategories()
      }
    })
  }

  enableEditMode(category: Category) {
    category.editing = true;
  }

  disableEditMode(category: Category) {
    category.editing = false;
  }

  confirmDeleteCategory(category: Category) {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {

        this.deleteCategory(category);
      }
    })
  }
}
