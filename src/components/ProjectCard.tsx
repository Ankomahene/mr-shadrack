import { BiLinkExternal } from 'react-icons/bi';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  imageUrl: string;
  name: string;
  description: string;
  link: string;
  stacks?: string[];
}

export const ProjectCard = ({
  imageUrl,
  name,
  description,
  link,
  stacks,
}: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
    >
      <Card className="max-w-xs overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div
          className="h-[200px] w-[320px] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground mt-2">{description}</p>

          {stacks && stacks.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {stacks?.map((stack, index) => (
                <span
                  key={index}
                  className="text-xs font-medium text-muted-foreground bg-muted/20 rounded-full px-2 py-1"
                >
                  {stack}
                </span>
              ))}
            </div>
          )}

          <div className="flex justify-start mt-4">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 text-primary hover:bg-primary/10 border-primary/30"
              >
                <span>View</span>
                <BiLinkExternal className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
