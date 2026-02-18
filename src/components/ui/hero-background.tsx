import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const HeroBackground = ({ className }: { className?: string }) => {
    return (
        <div className={cn("absolute inset-0 -z-10 overflow-hidden", className)}>
            {/* Grid Pattern */}
            <div className="absolute h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            {/* Floating Orbs - Primary */}
            <motion.div
                className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] opacity-30 dark:opacity-20"
                animate={{
                    x: [0, 40, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
            />

            {/* Floating Orbs - Secondary */}
            <motion.div
                className="absolute top-[20%] right-[-5%] w-[30%] h-[50%] rounded-full bg-secondary/20 blur-[100px] opacity-30 dark:opacity-20"
                animate={{
                    x: [0, -30, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 2
                }}
            />

            {/* Floating Orbs - Bottom Center */}
            <motion.div
                className="absolute bottom-[-20%] left-[30%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] opacity-20 dark:opacity-10"
                animate={{
                    x: [0, 20, 0],
                    y: [0, -40, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 5
                }}
            />
        </div>
    );
};
