-- Druk Stories: short, anonymous journey notes from Bhutanese students
CREATE TABLE public.druk_stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  dzongkhag TEXT NOT NULL,
  status TEXT NOT NULL,
  story TEXT NOT NULL,
  advice TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.druk_stories ENABLE ROW LEVEL SECURITY;

-- Anyone can read all stories (it's a public wall)
CREATE POLICY "Anyone can read druk stories"
ON public.druk_stories
FOR SELECT
USING (true);

-- Anyone can post a story
CREATE POLICY "Anyone can post a druk story"
ON public.druk_stories
FOR INSERT
WITH CHECK (
  length(trim(name)) BETWEEN 1 AND 40
  AND length(trim(dzongkhag)) BETWEEN 1 AND 40
  AND length(trim(status)) BETWEEN 1 AND 60
  AND length(trim(story)) BETWEEN 10 AND 600
  AND length(trim(advice)) BETWEEN 5 AND 200
);
