
-- Function to get total revenue
CREATE OR REPLACE FUNCTION public.get_total_revenue()
RETURNS numeric AS $$
BEGIN
  RETURN COALESCE(
    (SELECT SUM(amount) / 100.0 FROM public.payments WHERE status = 'succeeded'),
    0
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get monthly revenue for a specific year
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
