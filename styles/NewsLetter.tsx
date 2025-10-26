'use client';

import React, { useState } from 'react';
import Form from '@/components/forms/Form';
import FormField from '@/components/forms/FormField';
import Button from '@/components/ui/Button';

const NewsLetter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validateEmail = (value: string) => {
    const re = /^(?:[a-zA-Z0-9_'^&\/+\-])+(?:\.(?:[a-zA-Z0-9_'^&\/+\-])+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    return re.test(value);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setStatus('idle');

    if (!email || !validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(undefined);

    try {
      setStatus('submitting');
      // TODO: wire up to real API. For now we just simulate a short delay.
      await new Promise((res) => setTimeout(res, 600));
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section className="w-full">
      <div className="w-[90vw] mx-auto bg-secondary/70 border border-primary rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">Subscribe to our newsletter</h3>
            <p className="text-sm text-gray-700 mt-1">Get product updates, tips, and exclusive offers. No spam.</p>
          </div>

          <Form onSubmit={onSubmit} className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <FormField
                id="newsletter-email"
                type="email"
                label={undefined}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                error={error}
                className="flex-1"
                inputClassName="bg-white"
              />
              <div className="flex items-stretch">
                <Button
                  title={status === 'submitting' ? 'Subscribing…' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
                  type="submit"
                  onClick={() => {}}
                  disabled={status === 'submitting'}
                  className={`whitespace-nowrap px-5 py-3 rounded-full bg-primary text-white font-medium hover:opacity-90 transition ${status === 'success' ? 'bg-green-600' : ''}`}
                />
              </div>
            </div>
            {status === 'success' && (
              <p className="text-xs text-green-700 mt-2" role="status">Thanks! Please check your inbox to confirm.</p>
            )}
            {status === 'error' && (
              <p className="text-xs text-red-600 mt-2" role="alert">Something went wrong. Please try again.</p>
            )}
          </Form>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
