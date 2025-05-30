
-- Create applications table
CREATE TABLE IF NOT EXISTS public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  talent_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'interview', 'offer', 'rejected', 'hired')),
  cover_letter text,
  resume_url text,
  custom_q_a jsonb,
  version integer NOT NULL DEFAULT 1,
  last_activity_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  deleted_by uuid,
  anonymized_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

-- Create application status history table
CREATE TABLE IF NOT EXISTS public.application_status_history (
  id serial PRIMARY KEY,
  application_id uuid NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  old_status text,
  new_status text NOT NULL,
  changed_by uuid NOT NULL REFERENCES public.profiles(id),
  notes text,
  changed_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_status_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for applications
CREATE POLICY "talent_read_own_applications" ON public.applications
  FOR SELECT USING (talent_id = auth.uid());

CREATE POLICY "talent_create_applications" ON public.applications
  FOR INSERT WITH CHECK (talent_id = auth.uid());

CREATE POLICY "company_read_job_applications" ON public.applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.jobs 
      WHERE jobs.id = applications.job_id 
      AND jobs.company_id = auth.uid()
    )
  );

CREATE POLICY "company_update_job_applications" ON public.applications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.jobs 
      WHERE jobs.id = applications.job_id 
      AND jobs.company_id = auth.uid()
    )
  );

-- RLS Policies for application history
CREATE POLICY "read_application_history" ON public.application_status_history
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.applications 
      WHERE applications.id = application_status_history.application_id
      AND (
        applications.talent_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM public.jobs 
          WHERE jobs.id = applications.job_id 
          AND jobs.company_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "create_application_history" ON public.application_status_history
  FOR INSERT WITH CHECK (changed_by = auth.uid());

-- Trigger to update version and create history
CREATE OR REPLACE FUNCTION update_application_version_and_history()
RETURNS TRIGGER AS $$
BEGIN
  -- Update version
  NEW.version = OLD.version + 1;
  NEW.last_activity_at = now();
  
  -- Insert history record if status changed
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO public.application_status_history (
      application_id, 
      old_status, 
      new_status, 
      changed_by,
      notes
    ) VALUES (
      NEW.id,
      OLD.status,
      NEW.status,
      auth.uid(),
      'Status geändert von ' || COALESCE(OLD.status, 'null') || ' zu ' || NEW.status
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER applications_version_trigger
  BEFORE UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION update_application_version_and_history();

-- Enable realtime
ALTER TABLE public.applications REPLICA IDENTITY FULL;
ALTER TABLE public.application_status_history REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.applications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.application_status_history;
