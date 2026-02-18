import { BiLinkExternal } from 'react-icons/bi';
import { Card } from './ui/card';
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
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300 border-border/50">
        <div
          className="h-48 w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold mb-2">{name}</h3>
          <p className="text-muted-foreground text-sm flex-1 leading-relaxed">{description}</p>

          {stacks && stacks.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 mb-4">
              {stacks?.map((stack, index) => (
                <span
                  key={index}
                  className="text-xs font-medium text-primary bg-primary/10 rounded-md px-2 py-1"
                >
                  {stack}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto pt-4">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <span>View Project</span>
                <BiLinkExternal className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
