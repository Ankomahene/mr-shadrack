import { ReactIcon } from '@chakra-ui/icons';
import { ReactNode } from 'react';
import { FaAngular, FaCss3, FaHtml5, FaSass } from 'react-icons/fa';
import {
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiRedux,
  SiBootstrap,
  SiTailwindcss,
  SiMui,
} from 'react-icons/si';

export interface ISkill {
  icon: ReactNode;
  label: string;
  color: string;
}

export interface IProject {
  imageUrl: string;
  name: string;
  description: string;
  link: string;
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
    icon: <ReactIcon />,
    label: 'React',
    color: '#32c1ee',
  },

  {
    icon: <FaAngular />,
    label: 'Angular',
    color: '#da4353',
  },

  {
    icon: <SiTypescript />,
    label: 'TypeScript',
    color: '#1565c0',
  },
];

export const otherSkills: ISkill[] = [
  {
    icon: <SiNextdotjs />,
    label: 'Next.js',
    color: '#3d456d',
  },
  {
    icon: <SiRedux />,
    label: 'Redux',
    color: '#7248b6',
  },
  {
    icon: <SiMui />,
    label: 'Material UI',
    color: '#007bf7',
  },
  {
    icon: <SiBootstrap />,
    label: 'Bootstrap',
    color: '#3d0af5',
  },
  {
    icon: <SiTailwindcss />,
    label: 'Tailwind CSS',
    color: '#07b0ce',
  },
  {
    icon: <FaSass />,
    label: 'Sass/Scss',
    color: '#c76494',
  },
];

export const projects: IProject[] = [
  {
    imageUrl:
      'https://res.cloudinary.com/mister-shadrack/image/upload/v1685710283/mr-shadrack/o3pxswj5t1ioo1dcaiqh.jpg',
    name: 'Dronehub',
    description: 'Everything about drones',
    link: 'https://dronehub.netlify.app/',
  },
  {
    imageUrl:
      'https://res.cloudinary.com/mister-shadrack/image/upload/v1689539668/imgs/c7rdukuegnl8nrmurtvv.png',
    name: 'Hands for Seniors',
    description: 'Non-profit Organization aimed to support at risk',
    link: 'https://hands-for-seniors.netlify.app/',
  },
  {
    imageUrl:
      'https://res.cloudinary.com/mister-shadrack/image/upload/v1685710880/mr-shadrack/q2qz8b72933nnschayva.png',
    name: 'MS Buy',
    description: 'E-Commerce Website',
    link: 'http://ms-buy.netlify.app/',
  },
  {
    imageUrl:
      'https://res.cloudinary.com/mister-shadrack/image/upload/v1685709502/mr-shadrack/bd0qqd95yf0nbl208fue.jpg',
    name: 'CSS Glassmorphism Generator',
    description: 'Generate CSS glass effect for Elements',
    link: 'https://uidynamik.netlify.app/glassmorphism',
  },
  {
    imageUrl:
      'https://res.cloudinary.com/mister-shadrack/image/upload/v1685709676/mr-shadrack/ofa24ogpacgvvzowt6vy.jpg',
    name: 'UI Dynamik',
    description: 'UI Designs and More',
    link: 'https://uidynamik.netlify.app/',
  },
  {
    imageUrl:
      'https://res.cloudinary.com/mister-shadrack/image/upload/v1685710575/mr-shadrack/wr4q8ubop75tkbgk521t.jpg',
    name: 'MS Image Share',
    description: 'Upload and Share Images',
    link: 'https://ms-image-share.netlify.app/',
  },
  {
    imageUrl:
      'https://res.cloudinary.com/mister-shadrack/image/upload/v1685710734/mr-shadrack/vgz8ml3svot70pt8fkcu.jpg',
    name: 'Box Shadow Generator',
    description: 'Generate Cool CSS Box Shadows easily',
    link: 'https://css-box-shadow-gen.netlify.app/',
  },
  {
    imageUrl:
      'https://res.cloudinary.com/mister-shadrack/image/upload/v1685710250/mr-shadrack/cvrhuhzdjmv5mdyy5ihg.jpg',
    name: 'HTML CSS Buttons',
    description: 'Free HTML CSS beautiful buttons to use',
    link: 'https://uidynamik.netlify.app/showcase/buttons',
  },
  {
    imageUrl:
      'https://res.cloudinary.com/mister-shadrack/image/upload/v1685710404/mr-shadrack/ouoqbrdjbo1fxqbvbmjg.jpg',
    name: 'Playground',
    description: 'Practice HTML and CSS',
    link: 'https://ms-html-css-playground.netlify.app/',
  },
  {
    imageUrl:
      'https://res.cloudinary.com/mister-shadrack/image/upload/v1685711395/mr-shadrack/m52kxcpskvsdwjj0phxh.png',
    name: 'MS React Progress Bar',
    description: 'Open Source React Package',
    link: 'https://ankomahene.github.io/ms_react-progress-bar/',
  },
  {
    imageUrl:
      'https://res.cloudinary.com/mister-shadrack/image/upload/v1685709323/mr-shadrack/uzlkeuphh95pyi9ckxm0.jpg',
    name: 'Pepe Dame',
    description: 'Two player/Team Board Game',
    link: 'https://pepe-dame.netlify.app/',
  },

  {
    imageUrl:
      'https://res.cloudinary.com/mister-shadrack/image/upload/v1685712543/mr-shadrack/eq6y5fteadpczbhofkhe.jpg',
    name: 'Mr Shadrack',
    description: 'My personal portfolio',
    link: 'https://mr-shadrack.netlify.app/',
  },
];
