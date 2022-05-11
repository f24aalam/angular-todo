import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { SupabaseService } from './supabase.service';

interface Category {
  id: number;
  name: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends SupabaseService {

  constructor(private readonly auth: AuthService) {
    super();
  }

  get categories() {
    return this.supabase
      .from('categories')
      .select(`id, name, active`)
      .eq('user_id', this.auth.user?.id);
  }

  add(name: string) {
    return this.supabase
      .from('categories')
      .insert([{
        name: name,
        user_id: this.auth.user?.id,
        active: true,
        created_at: new Date(),
      }])
  }
}
