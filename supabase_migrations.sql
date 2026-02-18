-- Add display_order column to projects table
alter table public.projects add column display_order integer default 0;
