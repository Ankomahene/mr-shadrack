import { Box, Button, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { mainSkills, otherSkills } from '../consts';
import { SkillCard } from './SkillCard';

export const About = () => {
  return (
    <>
      <Heading id="moreAboutMe" my="2rem" size={{ base: 'md', lg: 'lg' }}>
        More About me
      </Heading>

      <Flex align="center" gap="6" flexDir={{ base: 'column', lg: 'row' }}>
        <Box w={{ base: '100%', lg: '15%' }}>Summary</Box>
        <Box w="80%" p={{ base: '1rem', lg: '2rem' }} borderLeft="1px">
          Experienced and dedicated software engineer with a strong focus on
          frontend development, boasting four years of professional experience.
          Demonstrating a profound ability to conceptualize and construct
          responsive web applications, I possess a comprehensive skill set
          encompassing HTML, CSS, JavaScript, React, Angular, and Typescript.
          <br />
          <br />
          Moreover, my extensive expertise in UI/UX ensures an exceptional user
          experience.
          <br />
          <br />
          My unwavering commitment to problem-solving, coupled with an ardent
          passion for continuous learning and personal growth, further fuel my
          drive for excellence in software development.
        </Box>
      </Flex>

      <Flex align="center" gap="6" flexDir={{ base: 'column', lg: 'row' }}>
        <Box w={{ base: '100%', lg: '15%' }} pt="2rem">
          Skills
        </Box>
        <Box w="80%" p={{ base: '1rem', lg: '2rem' }} borderLeft="1px">
          <Text
            my="1rem"
            fontWeight="bold"
            borderBottom="1px"
            borderColor="gray.300"
            py="1rem"
          >
            Super Powers
          </Text>
          <Flex gap={4} wrap="wrap">
            {mainSkills.map(({ icon, label, color }, i) => (
              <SkillCard
                key={label + i}
                icon={icon}
                label={label}
                color={color}
              />
            ))}
          </Flex>

          <Text
            my="1rem"
            fontWeight="bold"
            borderBottom="1px"
            borderColor="gray.300"
            py="1rem"
          >
            All Other Powers
          </Text>
          <Flex gap={4} wrap="wrap">
            {otherSkills.map(({ icon, label, color }, i) => (
              <SkillCard
                key={label + i}
                icon={icon}
                label={label}
                color={color}
              />
            ))}
          </Flex>

          <Text my="2rem">
            {' '}
            These are not the only powers I have. Check out{' '}
            <Link href="resume.pdf" download="shadrack-resume.pdf">
              <Button variant="link" color="brand.600" mx="3px">
                my resume
              </Button>
            </Link>
            to see more
          </Text>
        </Box>
      </Flex>
    </>
  );
};
