import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';

export function AuthHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
    } catch (error) {
      console.error('Error signing in with Google:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <Button 
        variant="secondary" 
        onClick={() => setIsOpen(true)}
        className="!w-auto"
      >
        Sign In
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute right-0 top-12 w-96 bg-white rounded-lg shadow-lg p-6"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <div className="flex justify-center mb-6">
              <div className="relative flex rounded-lg p-1 bg-gray-100">
                <button
                  onClick={() => setActiveForm('login')}
                  className={`relative px-4 py-2 text-sm font-medium ${
                    activeForm === 'login' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setActiveForm('register')}
                  className={`relative px-4 py-2 text-sm font-medium ${
                    activeForm === 'register' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Register
                </button>
                <motion.div
                  className="absolute inset-y-1 rounded-md bg-white shadow-sm"
                  initial={false}
                  animate={{
                    x: activeForm === 'login' ? 0 : '100%',
                    width: '50%'
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeForm}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeForm === 'login' ? <LoginForm /> : <SignUpForm />}
              </motion.div>
            </AnimatePresence>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="secondary"
                onClick={handleGoogleLogin}
                isLoading={loading}
                className="mt-4"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}