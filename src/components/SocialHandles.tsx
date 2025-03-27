import { ReactNode } from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface SocialButtonProps {
  children: ReactNode;
  label: string;
  href: string;
  delay?: number;
}

const SocialButton = ({
  children,
  label,
  href,
  delay = 0,
}: SocialButtonProps) => {
  return (
    <motion.a
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: delay,
      }}
      className="bg-muted/50 dark:bg-muted/20 rounded-full w-8 h-8 
                inline-flex items-center justify-center transition-colors 
                hover:bg-muted/70 dark:hover:bg-muted/40 text-foreground"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="sr-only">{label}</span>
      {children}
    </motion.a>
  );
};

export const SocialHandles = () => {
  return (
    <div className="flex space-x-4">
      <SocialButton label="Github" href="https://github.com/Ankomahene">
        <FaGithub className="h-4 w-4" />
      </SocialButton>
      <SocialButton
        label="Twitter"
        href="https://twitter.com/mister_shadrack"
        delay={0.1}
      >
        <FaTwitter className="h-4 w-4" />
      </SocialButton>
      <SocialButton
        label="LinkedIn"
        href="https://www.linkedin.com/in/shadrack-ankomahene-5a393311a/"
        delay={0.2}
      >
        <FaLinkedin className="h-4 w-4" />
      </SocialButton>
    </div>
  );
};
