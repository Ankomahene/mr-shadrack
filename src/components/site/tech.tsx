import { createElement } from 'react';
import type { IconType } from 'react-icons';
import { FaAws } from 'react-icons/fa';
import { RiOpenaiFill } from 'react-icons/ri';
import {
  SiAndroid,
  SiAngular,
  SiApple,
  SiChakraui,
  SiChartdotjs,
  SiCloudinary,
  SiCss,
  SiCypress,
  SiDocker,
  SiElectron,
  SiElevenlabs,
  SiExpo,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithubactions,
  SiGooglemaps,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiJetpackcompose,
  SiKotlin,
  SiMantine,
  SiMui,
  SiNestjs,
  SiNextdotjs,
  SiNgrx,
  SiNodedotjs,
  SiOpenjdk,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiReactivex,
  SiReactquery,
  SiRailway,
  SiRedis,
  SiRedux,
  SiSanity,
  SiShadcnui,
  SiSupabase,
  SiTailwindcss,
  SiTauri,
  SiTestinglibrary,
  SiTypescript,
  SiVite,
  SiVitest,
  SiZod,
} from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';
import { cn } from '../../lib/utils.ts';

const icons: Record<string, IconType> = {
  react: SiReact,
  'react native': SiReact,
  typescript: SiTypescript,
  javascript: SiJavascript,
  'next.js': SiNextdotjs,
  angular: SiAngular,
  'node.js': SiNodedotjs,
  nestjs: SiNestjs,
  'nest.js': SiNestjs,
  postgresql: SiPostgresql,
  supabase: SiSupabase,
  'tailwind css': SiTailwindcss,
  electron: SiElectron,
  kotlin: SiKotlin,
  'jetpack compose': SiJetpackcompose,
  prisma: SiPrisma,
  redis: SiRedis,
  docker: SiDocker,
  railway: SiRailway,
  firebase: SiFirebase,
  'firebase auth': SiFirebase,
  expo: SiExpo,
  figma: SiFigma,
  'figma api': SiFigma,
  openai: RiOpenaiFill,
  sanity: SiSanity,
  vite: SiVite,
  'tanstack query': SiReactquery,
  'react query': SiReactquery,
  zod: SiZod,
  rxjs: SiReactivex,
  ngrx: SiNgrx,
  'chart.js': SiChartdotjs,
  jest: SiJest,
  vitest: SiVitest,
  'ci/cd': SiGithubactions,
  'github actions': SiGithubactions,
  html: SiHtml5,
  css: SiCss,
  git: SiGit,
  'google places': SiGooglemaps,
  elevenlabs: SiElevenlabs,
  cloudinary: SiCloudinary,
  'material ui': SiMui,
  'chakra ui': SiChakraui,
  'redux toolkit': SiRedux,
  redux: SiRedux,
  java: SiOpenjdk,
  aws: FaAws,
  azure: VscAzure,
  'shadcn/ui': SiShadcnui,
  mantine: SiMantine,
  cypress: SiCypress,
  'react testing library': SiTestinglibrary,
  graphql: SiGraphql,
  tauri: SiTauri,
  android: SiAndroid,
  ios: SiApple,
};

export function techIcon(name: string): IconType | undefined {
  return icons[name.toLowerCase()];
}

export function TechChip({ name, className }: { name: string; className?: string }) {
  const Icon = techIcon(name);
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-border bg-background/50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground',
        className,
      )}
    >
      {Icon && createElement(Icon, { className: 'size-3', 'aria-hidden': true })}
      {name}
    </span>
  );
}
