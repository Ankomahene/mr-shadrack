import { Box, Heading } from '@chakra-ui/react';
import { WorksGrid } from '../components/works/WorksGrid';
import { Work } from '../types/Work';

const works: Work[] = [
  {
    id: crypto.randomUUID(),
    title: 'Members',
    description: 'Members Dashboard',
    thumbnail:
      'https://res.cloudinary.com/dicme7cio/image/upload/v1736420499/ui-ux/member_llpogo.png',
    images: [
      'https://res.cloudinary.com/dicme7cio/image/upload/v1736420499/ui-ux/member_llpogo.png',
    ],
    tags: ['UI/UX', 'Web Design', 'Dashboard', 'Team'],
    details: {
      client: '',
      role: '',
      duration: '3 days',
      description:
        'This members dashboard presents a clean and intuitive team management interface. The layout features a left sidebar for navigation and a main content area displaying team member cards in a grid format. Each member card shows essential information including profile picture/avatar, name, role',
    },
  },
  {
    id: crypto.randomUUID(),
    title: 'Dashboard',
    description: 'UI for Sales Dashboard',
    thumbnail:
      'https://res.cloudinary.com/dicme7cio/image/upload/v1736419358/ui-ux/day_630_yqgyer.png',
    images: [
      'https://res.cloudinary.com/dicme7cio/image/upload/v1736419358/ui-ux/day_630_yqgyer.png',
    ],
    tags: ['UI/UX', 'Web Design', 'Dashboard'],
    details: {
      client: '',
      role: '',
      duration: '1 week',
      description:
        'This airline sales dashboard showcases a sophisticated interface that elegantly combines functionality with visual clarity. The layout features a dark navy sidebar for navigation, complemented by a clean white main content area that displays critical flight sales analytics. Key performance indicators prominently display total sales ($7.8B+), passenger trips (23.7M), and domestic/international flight metrics, each with percentage changes for quick performance assessment.',
    },
  },
  {
    id: crypto.randomUUID(),
    title: 'Print Store',
    description: 'Design for Online print store',
    thumbnail:
      'https://res.cloudinary.com/dicme7cio/image/upload/v1736416737/ui-ux/fmt-thumb1_xss6n0.png',
    images: [
      'https://res.cloudinary.com/dicme7cio/image/upload/v1736416852/ui-ux/Home_Page1_1_wuisss.png',
      'https://res.cloudinary.com/dicme7cio/image/upload/v1736416876/ui-ux/Desktop_-_3_qijirl.png',
      'https://res.cloudinary.com/dicme7cio/image/upload/v1736417382/ui-ux/Buy_Modal_1_l6eqai.png',
    ],
    tags: ['UI/UX', 'Web Design', 'Ecommerce'],
    details: {
      client: '',
      role: '',
      duration: '1 month',
      description: 'UI/UX Design for Online print store',
    },
  },
  {
    id: crypto.randomUUID(),
    title: 'Breakfast Restaurant',
    description: 'UX for Breakfast Restaurant concept',
    thumbnail:
      'https://res.cloudinary.com/dicme7cio/image/upload/v1736418306/ui-ux/w_16_wdb1ra.png',
    images: [
      'https://res.cloudinary.com/dicme7cio/image/upload/v1736418370/ui-ux/3101841_1_t7l7mj.png',
    ],
    tags: ['UI/UX', 'Web Design', 'Restaurant'],
    details: {
      client: '',
      role: '',
      duration: '2 hours',
      description:
        'A design concept for a modern breakfast restaurant concept, featuring a clean and appetizing interface that showcases menu items, and gallery. The design emphasizes warm, inviting visuals and intuitive navigation to enhance user experience.',
    },
  },
  {
    id: crypto.randomUUID(),
    title: 'Recipe Components',
    description: 'UI for Recipe Components',
    thumbnail:
      'https://res.cloudinary.com/dicme7cio/image/upload/v1736418959/ui-ux/day_1145_z2lx9u.png',
    images: [
      'https://res.cloudinary.com/dicme7cio/image/upload/v1736418959/ui-ux/day_1145_z2lx9u.png',
    ],
    tags: ['UI/UX', 'Web Design', 'Recipe'],
    details: {
      client: '',
      role: '',
      duration: '2 days',
      description:
        'UI for Recipe Components, a modern and intuitive design system for recipe components, featuring a clean and appetizing interface that showcases menu items, ratings, email subscription, and others.',
    },
  },
  {
    id: crypto.randomUUID(),
    title: 'Job Cards',
    description: 'UI for Job Cards',
    thumbnail:
      'https://res.cloudinary.com/dicme7cio/image/upload/v1736419665/ui-ux/day_1524_qvngbn.png',
    images: [
      'https://res.cloudinary.com/dicme7cio/image/upload/v1736419665/ui-ux/day_1524_qvngbn.png',
    ],
    tags: ['UI/UX', 'Web Design', 'Job Cards'],
    details: {
      client: '',
      role: '',
      duration: '1 hour',
      description:
        'UI for Job Cards, featuring a clean interface that showcases open positions',
    },
  },
];

export const Works = () => {
  return (
    <Box w={{ base: '100%', lg: '80%' }} mx="auto" p="2rem">
      <Heading mb={8}>UI/UX Works</Heading>
      <WorksGrid works={works} />
    </Box>
  );
};
