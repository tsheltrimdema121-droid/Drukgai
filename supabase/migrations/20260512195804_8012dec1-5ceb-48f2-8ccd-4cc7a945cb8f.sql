CREATE TABLE public.mood_checkins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  mood text NOT NULL,
  gnh_pillar text NOT NULL,
  note text NOT NULL DEFAULT ''
);

ALTER TABLE public.mood_checkins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a mood check-in"
ON public.mood_checkins
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(mood)) between 1 and 20
  AND length(trim(gnh_pillar)) between 1 and 40
  AND length(note) <= 300
);