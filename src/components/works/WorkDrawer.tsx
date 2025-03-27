import { Work } from '../../types/Work';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Badge } from '../ui/badge';

interface WorkDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  work: Work | null;
}

const WorkDrawer = ({ isOpen, onClose, work }: WorkDrawerProps) => {
  if (!work) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        className="h-[90vh] overflow-y-auto sm:max-w-full md:max-w-4xl"
        side="bottom"
      >
        <SheetHeader className="pb-4">
          <SheetTitle className="text-2xl font-bold text-primary">
            {work.title}
          </SheetTitle>
        </SheetHeader>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-8">
          <div className="space-y-8">
            <AnimatePresence>
              {work.images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <img
                    src={image}
                    alt={`${work.title} - ${index + 1}`}
                    className="rounded-lg border border-border w-full md:w-[80%] mx-auto shadow-md"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="space-y-6 sticky top-4">
            <div className="w-full">
              <h4 className="font-semibold mb-2">About</h4>
              <p className="text-muted-foreground">
                {work.details.description}
              </p>
            </div>

            {work.details.client && (
              <div className="w-full">
                <h4 className="font-semibold mb-2">Client</h4>
                <p className="text-muted-foreground">{work.details.client}</p>
              </div>
            )}

            {work.details.role && (
              <div className="w-full">
                <h4 className="font-semibold mb-2">Role</h4>
                <p className="text-muted-foreground">{work.details.role}</p>
              </div>
            )}

            <div className="w-full">
              <h4 className="font-semibold mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {work.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="ghost"
                    className="text-primary border-primary/20"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default WorkDrawer;
