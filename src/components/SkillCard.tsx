import { Card, CardBody, CardHeader, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface SkillCardProps {
  icon: ReactNode;
  label: string;
  color: string;
}

export const SkillCard = ({ icon, label, color }: SkillCardProps) => {
  return (
    <Card
      direction="row"
      align="center"
      width="fit-content"
      rounded="none"
      borderTop="2px"
      borderColor={color}
    >
      <CardHeader p={3} color={color}>
        {icon}
      </CardHeader>
      <CardBody p={3} color={color}>
        <Text>{label}</Text>
      </CardBody>
    </Card>
  );
};
