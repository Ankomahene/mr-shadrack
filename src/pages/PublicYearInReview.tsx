import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { HeroBackground } from '../components/ui/hero-background';
import { Calendar, Tag, ExternalLink, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface ReviewItem {
    id: string;
    title: string;
    description: string;
    date: string;
    category: 'Work' | 'Life' | 'Learning' | 'Achievement' | 'Other';
    media_url?: string;
    tags?: string[];
}

const CategoryColors = {
    Work: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    Life: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    Learning: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    Achievement: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    Other: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
};

export const PublicYearInReview = () => {
    const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');

    const { data: items = [], isLoading } = useQuery({
        queryKey: ['year-in-review-public'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('year_in_review')
                .select('*')
                .order('date', { ascending: true });
            if (error) throw error;
            return data as ReviewItem[];
        }
    });

    // Extract unique years
    const years = Array.from(new Set(items.map(item => new Date(item.date).getFullYear()))).sort((a, b) => b - a);

    const filteredItems = selectedYear === 'all'
        ? items
        : items.filter(item => new Date(item.date).getFullYear() === selectedYear);

    return (
        <div className="min-h-screen relative isolate overflow-hidden bg-background">
            <HeroBackground className="opacity-50" />

            <div className="container mx-auto px-4 py-20 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        Year in <span className="text-primary">Review</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        A chronological journey through my professional milestones, personal growth, and memorable moments.
                    </p>
                </motion.div>

                {/* Year Filter */}
                {!isLoading && years.length > 0 && (
                    <div className="flex justify-center gap-4 mb-16 flex-wrap">
                        <Button
                            variant={selectedYear === 'all' ? "default" : "outline"}
                            onClick={() => setSelectedYear('all')}
                            className="rounded-full px-6"
                        >
                            All Time
                        </Button>
                        {years.map(year => (
                            <Button
                                key={year}
                                variant={selectedYear === year ? "default" : "outline"}
                                onClick={() => setSelectedYear(year)}
                                className="rounded-full px-6"
                            >
                                {year}
                            </Button>
                        ))}
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center py-20">
                        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
                    </div>
                )}

                {/* Timeline */}
                {!isLoading && (
                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 md:translate-x-0" />

                        <div className="space-y-12">
                            <AnimatePresence mode='popLayout'>
                                {filteredItems.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                            }`}
                                    >
                                        {/* Content Side */}
                                        <div className={`flex-1 md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'
                                            }`}>
                                            <div className={`p-6 bg-card/50 backdrop-blur-sm border rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'
                                                }`}>
                                                <div className={`flex flex-wrap gap-2 mb-3 items-center ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
                                                    }`}>
                                                    <Badge variant="secondary" className={`${CategoryColors[item.category]} border-0`}>
                                                        {item.category}
                                                    </Badge>
                                                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                    </span>
                                                </div>

                                                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                                    {item.title}
                                                </h3>

                                                <p className="text-muted-foreground leading-relaxed mb-4">
                                                    {item.description}
                                                </p>

                                                {item.tags && item.tags.length > 0 && (
                                                    <div className={`flex flex-wrap gap-2 mt-4 ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
                                                        }`}>
                                                        {item.tags.map(tag => (
                                                            <span key={tag} className="text-xs bg-secondary/50 px-2 py-1 rounded-md text-secondary-foreground flex items-center gap-1">
                                                                <Tag className="w-3 h-3 opacity-50" />
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                {item.media_url && (
                                                    <div className="mt-4 rounded-lg overflow-hidden border bg-muted/20">
                                                        {/* Simple check for image extension, could be improved */}
                                                        {item.media_url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                                                            <img src={item.media_url} alt={item.title} className="w-full h-auto object-cover max-h-64 hover:scale-105 transition-transform duration-500" />
                                                        ) : (
                                                            <a href={item.media_url} target="_blank" rel="noopener noreferrer" className="p-4 text-primary hover:underline flex items-center gap-2">
                                                                <ExternalLink className="w-4 h-4" />
                                                                View Media Resource
                                                            </a>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Timeline Dot */}
                                        <div className="absolute left-4 md:left-1/2 top-8 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg -translate-x-1/2 md:translate-x-1/2 z-10" />

                                        {/* Empty Side for layout balance on desktop */}
                                        <div className="hidden md:block md:w-1/2" />
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {filteredItems.length === 0 && (
                                <div className="text-center py-20 text-muted-foreground">
                                    No memories found for this period.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
