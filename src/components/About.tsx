import { Box, Button, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { mainSkills, otherSkills } from '../consts';
import { SkillCard } from './SkillCard';

export const About = () => {
  return (
    <>
      <Heading id="about" my="2rem" size={{ base: 'md', lg: 'lg' }}>
        More About me
      </Heading>

      <Flex
        align="center"
        gap="6"
        flexDir={{ base: 'column', lg: 'row' }}
        id="summary"
      >
        <Box w={{ base: '100%', lg: '15%' }}>Summary</Box>
        <Box w="80%" p={{ base: '1rem', lg: '2rem' }} borderLeft="1px">
          Experienced and dedicated software engineer specializing in frontend
          development, with five years of professional experience. Proficient in
          HTML, CSS, JavaScript, React.js, Next.js, Angular, and TypeScript.
          <br />
          <br />
          Passionate about problem-solving and driven by excellence, I bring a
          wealth of expertise and a strong focus on UI/UX to any software
          development team.
        </Box>
      </Flex>

      <Flex
        align="center"
        gap="6"
        flexDir={{ base: 'column', lg: 'row' }}
        id="skills"
      >
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
            Other Powers
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
            <Link href="resume-2024.pdf" download="shadrack-resume.pdf">
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
