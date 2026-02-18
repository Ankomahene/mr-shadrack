import { ReactNode } from 'react';
import {
  FaAngular,
  FaAws,
  FaCss3,
  FaFigma,
  FaHtml5,
  FaNodeJs,
  FaReact
} from 'react-icons/fa';
import {
  SiBootstrap,
  SiGraphql,
  SiJavascript,
  SiMui,
  SiNestjs,
  SiNextdotjs,
  SiPostgresql,
  SiReactquery,
  SiRedux,
  SiSupabase,
  SiTailwindcss,
  SiTypescript
} from 'react-icons/si';

export interface ISkill {
  icon: ReactNode;
  label: string;
  color: string;
}

export const mainSkills: ISkill[] = [
  {
    icon: <FaHtml5 />,
    label: 'HTML',
    color: '#ec7624',
  },
  {
    icon: <FaCss3 />,
    label: 'CSS',
    color: '#1565c0',
  },
  {
    icon: <SiJavascript />,
    label: 'JavaScript',
    color: '#f7b500',
  },
  {
    icon: <FaReact />,
    label: 'React',
    color: '#32c1ee',
  },
  {
    icon: <SiNextdotjs />,
    label: 'Next.js',
    color: '#3d456d',
  },
  {
    icon: <SiTypescript />,
    label: 'TypeScript',
    color: '#1565c0',
  },
  {
    icon: <FaAngular />,
    label: 'Angular',
    color: '#da4353',
  },
  {
    icon: <FaNodeJs />,
    label: 'Node.js',
    color: '#417e38',
  },
  {
    icon: <SiNestjs />,
    label: 'Nest.js',
    color: '#e0234e',
  },
  {
    icon: <SiPostgresql />,
    label: 'PostgreSQL',
    color: '#336791',
  },
];

export const otherSkills: ISkill[] = [
  {
    icon: <SiSupabase />,
    label: 'Supabase',
    color: '#3ecf8e',
  },
  {
    icon: <FaAws />,
    label: 'AWS',
    color: '#ff9900',
  },
  {
    icon: <SiGraphql />,
    label: 'GraphQL',
    color: '#e10098',
  },
  {
    icon: <SiReactquery />,
    label: 'React Query',
    color: '#ff4154',
  },
  {
    icon: <SiRedux />,
    label: 'Redux',
    color: '#764abc',
  },
  {
    icon: <SiMui />,
    label: 'Material UI',
    color: '#007fff',
  },
  {
    icon: <SiTailwindcss />,
    label: 'Tailwind CSS',
    color: '#06b6d4',
  },
  {
    icon: <SiBootstrap />,
    label: 'Bootstrap',
    color: '#7952b3',
  },
  {
    icon: <FaFigma />,
    label: 'Figma',
    color: '#f24e1e',
  },
];


