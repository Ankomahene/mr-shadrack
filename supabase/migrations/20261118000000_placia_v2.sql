-- Placia GH v2: now hosted on Railway, rebuilt on open data with its own search engine.
update public.projects set
  link = 'https://placiagh.up.railway.app',
  year = '2026',
  platforms = array['Web', 'PWA'],
  description = $t$Search for any place in Ghana the way you would ask a friend: “pharmacy near Osu”, typed or spoken. Real places on a map, ranked by what you meant.$t$,
  overview = $t$Placia started as a 2025 hackathon project on Google Places. Version 2 is a full rebuild on open data: its own database of places across Ghana, a hybrid search engine that blends keyword, fuzzy and meaning-based matching, and an AI step that reads the request (place type, area, landmark, "near me") with a rule-based fallback when the model is slow.

Search quality is measured, not guessed: an evaluation set of real Ghanaian queries scores every ranking change, and an admin view flags real searches that went wrong, such as misheard voice input, the wrong kind of place or a quick rephrase, so they can be fixed.$t$,
  image_url = '/work/placia-gh/search.webp',
  gallery = '[{"src":"/work/placia-gh/search.webp","alt":"Search results on the map","frame":"browser"},{"src":"/work/placia-gh/home.webp","alt":"Placia home","frame":"browser"},{"src":"/work/placia-gh/mobile.webp","alt":"Search on mobile","frame":"phone"}]'::jsonb,
  highlights = array[
    'Hybrid search in Postgres: full-text, trigram and vector arms fused with reciprocal rank fusion.',
    'AI request parsing with a rules fallback, plus voice search and an Ask mode.',
    'Evaluation harness of real queries; every ranking change is scored before it ships.'
  ],
  tags = array['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'pgvector', 'OpenAI', 'MapLibre', 'Railway'],
  updated_at = now()
where slug = 'placia-gh';
