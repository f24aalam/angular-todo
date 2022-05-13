import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Category } from './category.service';
import { SupabaseService } from './supabase.service';

export interface Task {
  id: number;
  category: Category;
  description: string;
  completed_at: Date;
  editing: boolean;
  saving: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService extends SupabaseService {

  constructor(private readonly auth: AuthService) {
    super();
  }

  get tasks() {
    return this.supabase
      .from('tasks')
      .select(`id, category (id, name, active), description, completed_at`)
      .eq('user_id', this.auth.user?.id);
  }

  add(description: string, category: Category) {
    return this.supabase
      .from('tasks')
      .insert([{
        description: description,
        user_id: this.auth.user?.id,
        category_id: category.id,
        completed_at: null,
        created_at: new Date(),
      }])
  }

  update(
    description: string,
    task: Task,
    category: Category,
    completed: boolean = false,
  ) {
    return this.supabase
      .from('tasks')
      .update({
        description: description,
        category_id: category.id,
        completed_at: completed ? new Date() : null,
      })
      .match({'id': task.id});
  }

  delete(task: Task) {
    return this.supabase
      .from('tasks')
      .delete()
      .match({'id': task.id});
  }
}
