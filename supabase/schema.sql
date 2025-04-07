-- Create the coach_hours table for storing session logs
CREATE TABLE IF NOT EXISTS coach_hours (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    date DATE NOT NULL,
    hours DECIMAL(5, 2) NOT NULL,
    program TEXT NOT NULL,
    coach TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE coach_hours ENABLE ROW LEVEL SECURITY;

-- Create policy for users to see only their own entries
CREATE POLICY "Users can view their own entries" 
    ON coach_hours FOR SELECT 
    USING (auth.uid() = user_id);

-- Create policy for users to insert their own entries
CREATE POLICY "Users can insert their own entries" 
    ON coach_hours FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Create policy for users to update their own entries
CREATE POLICY "Users can update their own entries" 
    ON coach_hours FOR UPDATE 
    USING (auth.uid() = user_id);

-- Create policy for users to delete their own entries
CREATE POLICY "Users can delete their own entries" 
    ON coach_hours FOR DELETE 
    USING (auth.uid() = user_id);

-- Create a function to get hours summary by program
CREATE OR REPLACE FUNCTION get_hours_summary()
RETURNS TABLE (
    program TEXT,
    total_hours DECIMAL(10, 2),
    coach_count INTEGER
) 
LANGUAGE SQL
SECURITY DEFINER
AS $$
    SELECT 
        program,
        SUM(hours) as total_hours,
        COUNT(DISTINCT coach) as coach_count
    FROM 
        coach_hours
    WHERE 
        user_id = auth.uid()
    GROUP BY 
        program
    ORDER BY 
        program;
$$;

-- Create a function to get hours by coach
CREATE OR REPLACE FUNCTION get_hours_by_coach()
RETURNS TABLE (
    coach TEXT,
    total_hours DECIMAL(10, 2),
    program_count INTEGER
) 
LANGUAGE SQL
SECURITY DEFINER
AS $$
    SELECT 
        coach,
        SUM(hours) as total_hours,
        COUNT(DISTINCT program) as program_count
    FROM 
        coach_hours
    WHERE 
        user_id = auth.uid()
    GROUP BY 
        coach
    ORDER BY 
        coach;
$$;

-- Create a trigger to automatically update the updated_at field
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_coach_hours_updated_at
BEFORE UPDATE ON coach_hours
FOR EACH ROW
EXECUTE FUNCTION update_modified_column(); 