-- Drop existing objects if they exist
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM pg_type WHERE typname = 'requirement_type') THEN
        DROP TYPE requirement_type CASCADE;
    END IF;
END $$;

DROP TABLE IF EXISTS requirement_templates CASCADE;

-- Create requirement type enum
CREATE TYPE requirement_type AS ENUM (
    'document_upload',
    'custom_form'
);

-- Create requirements template table
CREATE TABLE requirement_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id UUID NOT NULL REFERENCES entities(id),
    title TEXT NOT NULL,
    instruction TEXT,
    type requirement_type NOT NULL,
    form_json JSONB,        -- Stores the SurveyJS form definition for both types
    -- Common fields
    created_by UUID NOT NULL REFERENCES profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create index for better query performance
CREATE INDEX requirement_templates_entity_id_idx ON requirement_templates(entity_id);

-- Enable RLS
ALTER TABLE requirement_templates ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
DO $$ BEGIN
CREATE POLICY "Users can view requirement templates for their entity"
    ON requirement_templates FOR SELECT
    USING (
        entity_id IN (
            SELECT e.id 
            FROM entities e 
            WHERE e.created_by = auth.uid()
        )
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
CREATE POLICY "Users can insert requirement templates for their entity"
    ON requirement_templates FOR INSERT
    WITH CHECK (
        entity_id IN (
            SELECT e.id 
            FROM entities e 
            WHERE e.created_by = auth.uid()
        )
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
CREATE POLICY "Users can update requirement templates for their entity"
    ON requirement_templates FOR UPDATE
    USING (
        entity_id IN (
            SELECT e.id 
            FROM entities e 
            WHERE e.created_by = auth.uid()
        )
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
CREATE POLICY "Users can delete requirement templates for their entity"
    ON requirement_templates FOR DELETE
    USING (
        entity_id IN (
            SELECT e.id 
            FROM entities e 
            WHERE e.created_by = auth.uid()
        )
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Create updated_at trigger
CREATE TRIGGER update_requirement_templates_updated_at
    BEFORE UPDATE ON requirement_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 