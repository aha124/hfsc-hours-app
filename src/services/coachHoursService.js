import { supabase } from '../lib/supabase';

const coachHoursService = {
  /**
   * Get all coach hours entries for the current user
   */
  async getHours() {
    const { data, error } = await supabase
      .from('coach_hours')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data || [];
  },
  
  /**
   * Add a new coach hours entry
   */
  async addHours(entry) {
    // Get the current user's ID
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    // Add user_id to the entry
    const newEntry = {
      ...entry,
      user_id: user.id,
      created_at: new Date().toISOString(),
    };
    
    const { data, error } = await supabase
      .from('coach_hours')
      .insert(newEntry)
      .select();
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data?.[0] || null;
  },
  
  /**
   * Delete a coach hours entry
   */
  async deleteHours(id) {
    const { error } = await supabase
      .from('coach_hours')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw new Error(error.message);
    }
    
    return true;
  },
  
  /**
   * Get coach hours summary by program
   */
  async getHoursSummary() {
    const { data, error } = await supabase
      .rpc('get_hours_summary');
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data || [];
  }
};

export default coachHoursService; 