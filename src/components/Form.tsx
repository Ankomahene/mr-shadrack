import { useState } from 'react';
import { SentAlertMain } from './SentAlert';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

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
        const response = await fetch('/.netlify/functions/send-email', {
          method: 'POST',
          body: JSON.stringify({
            name,
            email,
            message,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        setSent(true);
        setName('');
        setEmail('');
        setMessage('');
      } catch (error) {
        setError('Failed to send message. Please try again.');
      } finally {
        setIsSending(false);
      }
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <section id="contact" className="mb-12">
      <div className="bg-gradient-to-r from-primary-600 to-primary-400 p-8 text-white text-center h-[250px] flex flex-col justify-center items-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Send a Message
        </motion.h2>
        <motion.p
          className="py-4 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Got a Question or Want to Reach out?
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        viewport={{ once: true }}
        className="-mt-20"
      >
        <Card className="w-full lg:w-4/5 mx-auto p-8 shadow-lg">
          {sent ? (
            <SentAlertMain />
          ) : (
            <div className="w-full max-w-lg mx-auto">
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
                  className="w-full p-3 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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
                  placeholder="username@example.com"
                  required
                  className="w-full p-3 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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
                  placeholder="Type your message here"
                  required
                  rows={6}
                  className="w-full p-3 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="mb-6">
                <Button
                  variant="gradient"
                  className="w-full py-6"
                  type="button"
                  onClick={handleSendMessage}
                  disabled={isSending}
                >
                  {isSending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </motion.div>
    </section>
  );
};
