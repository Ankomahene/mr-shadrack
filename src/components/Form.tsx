import { useState } from 'react';
import { SentAlertMain } from './SentAlert';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async () => {
    if (message && name && email) {
      setIsSending(true);
      setError(null);
      try {
        // Save to Supabase
        const { error: dbError } = await supabase.from('messages').insert([
          { name, email, message }
        ]);

        if (dbError) throw dbError;

        // Optional: Call existing Netlify function if needed, or remove if Supabase is enough.
        // Keeping it for now as a backup/notification mechanism if configured.
        try {
          await fetch('/.netlify/functions/send-email', {
            method: 'POST',
            body: JSON.stringify({
              name,
              email,
              message,
            }),
          });
        } catch (e) {
          console.warn('Email notification failed, but message saved to DB', e);
        }

        setSent(true);
        setName('');
        setEmail('');
        setMessage('');
      } catch (error) {
        console.error(error);
        setError('Failed to send message. Please try again.');
      } finally {
        setIsSending(false);
      }
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <section id="contact" className="w-full lg:w-4/5 mx-auto p-8 mb-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Get in Touch
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Have a question or want to work together? Feel free to reach out.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Card className="w-full max-w-2xl mx-auto p-8 shadow-sm border-border/50">
          {sent ? (
            <SentAlertMain />
          ) : (
            <div className="w-full">
              {error && (
                <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-6 text-sm">
                  {error}
                </div>
              )}
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  required
                  className="w-full p-3 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full p-3 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  className="w-full p-3 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                />
              </div>

              <Button
                className="w-full h-12 text-lg font-medium"
                onClick={handleSendMessage}
                disabled={isSending}
              >
                {isSending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </div>
          )}
        </Card>
      </motion.div>
    </section>
  );
};
