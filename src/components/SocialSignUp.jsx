'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { FaGoogle } from 'react-icons/fa';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const SocialSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSocialSignUp = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/'
      });
      
      if (error) {
        toast.error(error.message || 'Failed to connect with Google');
        setIsLoading(false);
      } else {
        toast.success('Redirecting to Google...');
      }
    } catch (error) {
      toast.error('Failed to connect with Google');
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSocialSignUp}
      disabled={isLoading}
      type="button"
      className="mt-5 flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border border-black/10 bg-black/[0.03] text-slate-800 transition-all duration-300 hover:border-black/20 hover:bg-black/[0.06] disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-white/20 dark:hover:bg-white/10"
    >
      {isLoading ? (
        <Loader2 className="animate-spin text-lg" />
      ) : (
        <FaGoogle className="text-lg text-red-500" />
      )}
      <span className="font-medium">
        {isLoading ? 'Connecting...' : 'Continue with Google'}
      </span>
    </button>
  );
};

export default SocialSignUp;
