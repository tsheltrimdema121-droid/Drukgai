
CREATE TABLE public.ikigai_reflections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  love TEXT NOT NULL,
  good TEXT NOT NULL,
  world TEXT NOT NULL,
  pay TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.quiz_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  answers JSONB NOT NULL,
  score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  percentage INTEGER NOT NULL,
  tier TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.ikigai_reflections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit ikigai reflections"
  ON public.ikigai_reflections FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can submit quiz responses"
  ON public.quiz_responses FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
