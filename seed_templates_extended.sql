-- Run in Supabase SQL editor (service role / dashboard) to register templates.
-- Upserts by slug so it is safe to re-run.

insert into public.templates (slug, name, description, r2_path, thumbnail_url)
values
  (
    'midnight-botanica',
    'Midnight Botanica',
    'Deep emerald botanical drama with refined typography.',
    'templates/midnight-botanica',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800'
  ),
  (
    'sunrise-garden',
    'Sunrise Garden',
    'Warm rose and citrus garden romance.',
    'templates/sunrise-garden',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800'
  ),
  (
    'nordic-minimal',
    'Nordic Minimal',
    'Split hero layout with calm Scandinavian restraint.',
    'templates/nordic-minimal',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800'
  ),
  (
    'art-deco-glam',
    'Art Deco Glam',
    'Navy and gold Gatsby-inspired evening.',
    'templates/art-deco-glam',
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800'
  ),
  (
    'coastal-breeze',
    'Coastal Breeze',
    'Teal ocean gradients and beach-weekend energy.',
    'templates/coastal-breeze',
    'https://images.unsplash.com/photo-1507525428037-b723cf961d3e?auto=format&fit=crop&q=80&w=800'
  ),
  (
    'sophisticated-wedding-canva',
    'Sophisticated Wedding (Canva)',
    'Elegant Canva invitation embed with responsive full-width preview.',
    'templates/sophisticated-wedding-canva',
    'https://images.unsplash.com/photo-1519741497674-7470cc7b0d39?auto=format&fit=crop&q=80&w=800'
  )
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  r2_path = excluded.r2_path,
  thumbnail_url = excluded.thumbnail_url;
