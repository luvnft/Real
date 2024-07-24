import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ajkuhuefceydmmlaaeho.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqa3VodWVmY2V5ZG1tbGFhZWhvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxOTExNTYzMiwiZXhwIjoyMDM0NjkxNjMyfQ.QuhXfL3HpRxqIQv9pluxL7_QnYjSYNf6G7RG4fyrga4";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;