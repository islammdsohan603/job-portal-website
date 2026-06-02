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
      className="
        w-full
        mt-5
        h-14
        rounded-2xl
        border
        border-white/10
        bg-white/5
        text-white
        flex
        items-center
        justify-center
        gap-3
        transition-all
        duration-300
        hover:bg-white/10
        hover:border-white/20
        cursor-pointer
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
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
