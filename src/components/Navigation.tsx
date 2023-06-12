import {
  Box,
  Button,
  Card,
  Flex,
  ListItem,
  ListItemProps,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { FaProjectDiagram, FaUser } from 'react-icons/fa';
import { TbStarsFilled } from 'react-icons/tb';
import { Link } from 'react-scroll';
import { GiNotebook, GiSkills } from 'react-icons/gi';
import { IoIosPaper } from 'react-icons/io';
import { BiCollapseHorizontal, BiExpandHorizontal } from 'react-icons/bi';
import { useState } from 'react';

const listItemStyle: ListItemProps = {
  my: '1rem',
  cursor: 'pointer',
};

export interface ISection {
  title: string;
  link: string;
  icon: JSX.Element;
}

export interface IPageSection extends ISection {
  sections?: ISection[];
}

const sections: IPageSection[] = [
  {
    title: 'Experience',
    link: 'experience',
    icon: <TbStarsFilled />,
  },
  {
    title: 'About',
    link: 'about',
    icon: <FaUser />,
    sections: [
      {
        title: 'Summary',
        link: 'summary',
        icon: <GiNotebook />,
      },
      {
        title: 'Skills',
        link: 'skills',
        icon: <GiSkills />,
      },
    ],
  },
  {
    title: 'Resume',
    link: 'resume',
    icon: <IoIosPaper />,
  },
  {
    title: 'Projects',
    link: 'projects',
    icon: <FaProjectDiagram />,
  },
];

export const Navigation = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      rounded={expanded ? 'md' : 'full'}
      m="1rem"
      pos="fixed"
      top={{ base: 'auto', lg: '40%' }}
      bottom={{ base: '0.5rem', lg: 'auto' }}
      right={{ base: 8, lg: 5 }}
      zIndex={100}
      fontSize="sm"
      bgColor="rgba(36,99,235, 0.5)"
      color="white"
      shadow="lg"
      borderColor="white"
      borderWidth="1px"
      borderStyle="dashed"
      backdropFilter="blur(8px) saturate(100%)"
    >
      <Box display={{ base: 'none', lg: 'block' }} py="0.5rem" px="1rem">
        {expanded ? (
          <>
            <Button
              onClick={() => setExpanded(false)}
              mt="0.7rem"
              mb="1rem"
              w="full"
              color="red.500"
              size="sm"
              title="Shrink"
            >
              <BiCollapseHorizontal />
            </Button>
            <ExpandedNavigation />
          </>
        ) : (
          <>
            <Button
              onClick={() => setExpanded(true)}
              mt="0.7rem"
              mb="1.5rem"
              w="full"
              color="red.500"
              size="sm"
              title="expand"
            >
              <BiExpandHorizontal />
            </Button>
            <CollapsedNavigation />
          </>
        )}
      </Box>

      <Box display={{ base: 'block', lg: 'none' }} py="0.5rem" px="1rem">
        <CollapsedNavigation />
      </Box>
    </Card>
  );
};

const ExpandedNavigation = () => {
  return (
    <Box>
      <UnorderedList ml="1rem" listStyleType="none">
        {sections.map((section) => (
          <ListItem key={section.link} {...listItemStyle}>
            <Link to={section.link} smooth={true} duration={1000}>
              <Flex align="center" gap="1">
                {section.icon}
                {section.title}
              </Flex>
            </Link>

            {section.sections && (
              <UnorderedList listStyleType="none">
                {section.sections.map((innerSection) => (
                  <Link
                    key={innerSection.link}
                    to={innerSection.link}
                    smooth={true}
                    duration={1000}
                  >
                    <ListItem {...listItemStyle}>
                      <Flex align="center" gap="1">
                        {innerSection.icon}
                        {innerSection.title}
                      </Flex>
                    </ListItem>
                  </Link>
                ))}
              </UnorderedList>
            )}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

const CollapsedNavigation = () => {
  return (
    <Box>
      <Flex flexDir={{ base: 'row', lg: 'column' }} gap={6} textAlign="center">
        {sections.map((section) => (
          <Link to={section.link} smooth={true} duration={1000}>
            <Button
              bgColor="white"
              w={10}
              h={10}
              p="0"
              rounded="full"
              title={section.title}
              color="brand.500"
            >
              {section.icon}
            </Button>
          </Link>
        ))}
      </Flex>
    </Box>
  );
};
