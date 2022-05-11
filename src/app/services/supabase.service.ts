import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  public supabase: SupabaseClient;

  constructor() {
    this.supabase = new SupabaseClient(environment.supabaseUrl, environment.supabaseKey);
  }
}
