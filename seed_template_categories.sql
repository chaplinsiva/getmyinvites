-- Template browse categories + assignments (run after templates rows exist).
-- Safe to re-run: upserts categories and updates templates by slug.

insert into public.template_categories (slug, name, sort_order) values
  ('minimal', 'Minimal', 10),
  ('floral', 'Floral & garden', 20),
  ('glamour', 'Glamour', 30),
  ('coastal', 'Coastal', 40)
on conflict (slug) do update set
  name = excluded.name,
  sort_order = excluded.sort_order;

update public.templates set category_id = (select id from public.template_categories where slug = 'minimal' limit 1)
where slug in ('nordic-minimal', 'modern-serenity');

update public.templates set category_id = (select id from public.template_categories where slug = 'floral' limit 1)
where slug in ('midnight-botanica', 'sunrise-garden', 'royal-mandala');

update public.templates set category_id = (select id from public.template_categories where slug = 'glamour' limit 1)
where slug = 'art-deco-glam';

update public.templates set category_id = (select id from public.template_categories where slug = 'coastal' limit 1)
where slug = 'coastal-breeze';
