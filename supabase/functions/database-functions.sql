
-- Function to get total revenue (existing)
CREATE OR REPLACE FUNCTION public.get_total_revenue()
RETURNS numeric AS $$
BEGIN
  RETURN COALESCE(
    (SELECT SUM(amount) / 100.0 FROM public.payments WHERE status = 'succeeded'),
    0
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get monthly revenue for a specific year (existing)
CREATE OR REPLACE FUNCTION public.get_monthly_revenue(year integer)
RETURNS TABLE (
  month integer,
  revenue numeric
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    EXTRACT(MONTH FROM created_at)::integer AS month,
    SUM(amount) / 100.0 AS revenue
  FROM
    public.payments
  WHERE
    status = 'succeeded'
    AND EXTRACT(YEAR FROM created_at) = year
  GROUP BY
    month
  ORDER BY
    month;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- New function to get refund requests (for admin)
CREATE OR REPLACE FUNCTION public.get_pending_refund_requests()
RETURNS TABLE (
  id uuid,
  payment_id uuid,
  user_id uuid,
  reason text,
  status text,
  created_at timestamptz,
  payment_amount numeric,
  job_title text,
  user_email text
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    rr.id,
    rr.payment_id,
    rr.user_id,
    rr.reason,
    rr.status,
    rr.created_at,
    (p.amount / 100.0)::numeric AS payment_amount,
    j.title AS job_title,
    u.email AS user_email
  FROM
    public.refund_requests rr
    JOIN public.payments p ON rr.payment_id = p.id
    JOIN public.jobs j ON p.job_id = j.id
    JOIN auth.users u ON rr.user_id = u.id
  WHERE
    rr.status = 'pending'
  ORDER BY
    rr.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create table for refund requests if it doesn't exist
CREATE TABLE IF NOT EXISTS public.refund_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id UUID REFERENCES public.payments(id),
  user_id UUID REFERENCES auth.users(id),
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  admin_notes TEXT,
  processed_by UUID REFERENCES auth.users(id)
);

-- Add RLS policies for refund_requests table
ALTER TABLE public.refund_requests ENABLE ROW LEVEL SECURITY;

-- Users can view their own refund requests
CREATE POLICY "users_can_view_own_refund_requests" ON public.refund_requests
  FOR SELECT USING (user_id = auth.uid());

-- Users can insert their own refund requests (though typically done via function)
CREATE POLICY "users_can_request_refunds" ON public.refund_requests
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Only admins can update refund requests
CREATE POLICY "admins_can_update_refund_requests" ON public.refund_requests
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'operator'
    )
  );

-- Add payment status tracking function
CREATE OR REPLACE FUNCTION update_job_on_payment_change()
RETURNS TRIGGER AS $$
BEGIN
  -- If a payment status changes to succeeded, update the job
  IF NEW.status = 'succeeded' AND (OLD.status IS NULL OR OLD.status <> 'succeeded') THEN
    UPDATE public.jobs
    SET 
      is_paid = TRUE,
      status = 'In Prüfung',
      updated_at = NOW()
    WHERE id = NEW.job_id;
  -- If a payment is refunded, update the job
  ELSIF NEW.status = 'refunded' AND (OLD.status IS NULL OR OLD.status <> 'refunded') THEN
    UPDATE public.jobs
    SET 
      is_paid = FALSE,
      status = 'Zahlung erstattet',
      updated_at = NOW()
    WHERE id = NEW.job_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for payment status changes
DROP TRIGGER IF EXISTS on_payment_status_change ON public.payments;
CREATE TRIGGER on_payment_status_change
  AFTER UPDATE ON public.payments
  FOR EACH ROW
  WHEN (NEW.status IS DISTINCT FROM OLD.status)
  EXECUTE FUNCTION update_job_on_payment_change();
