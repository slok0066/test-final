import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToolLayout } from '@/components/tool-layout';
import { motion } from 'framer-motion';
import { Dices, Shuffle } from 'lucide-react';

export default function YesNoSpinner() {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<'YES' | 'NO' | null>(null);
  const [flips, setFlips] = useState(0);
  const [shake, setShake] = useState(false);

  const generateAnswer = () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    setShake(true);
    setResult(null);
    
    // Random number of flips between 10 and 20
    const numFlips = 10 + Math.floor(Math.random() * 10);
    setFlips(numFlips);
    
    // Ensure true 50-50 probability by using Math.floor(Math.random() * 2)
    const finalResult = Math.floor(Math.random() * 2) === 0 ? 'YES' : 'NO';
    
    // Show result after animation
    setTimeout(() => {
      setResult(finalResult);
      setIsFlipping(false);
      setShake(false);
    }, 2000);
  };

  // Reset shake animation
  useEffect(() => {
    if (shake) {
      const timer = setTimeout(() => setShake(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [shake]);

  return (
    <ToolLayout title="Yes/No Oracle" description="Let destiny guide your choice">
      <div className="w-full max-w-2xl mx-auto p-6 space-y-8">
        {/* Main Card */}
        <div className="relative perspective-1000">
          <motion.div
            animate={{ 
              rotateY: isFlipping ? flips * 180 : 0,
              scale: shake ? [1, 1.02, 0.98, 1] : 1
            }}
            transition={{ 
              duration: isFlipping ? 2 : 0,
              ease: "easeInOut",
              scale: {
                duration: 0.5,
                repeat: shake ? 2 : 0
              }
            }}
            className="relative preserve-3d"
          >
            <Card className="w-full aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-indigo-500/20 backdrop-blur-sm border-2">
              {!isFlipping && !result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-4"
                >
                  <Dices className="w-16 h-16 mx-auto text-primary/60" />
                  <p className="text-xl font-medium text-primary/80">
                    Tap to reveal your destiny
                  </p>
                </motion.div>
              )}
              
              {!isFlipping && result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-4"
                >
                  <div className={`text-6xl font-bold ${
                    result === 'YES' ? 'text-emerald-500' : 'text-rose-500'
                  }`}>
                    {result}
                  </div>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 0.5,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                    className="text-xl font-medium text-primary/60"
                  >
                    {result === 'YES' ? 'Go for it!' : 'Maybe not...'}
                  </motion.div>
                </motion.div>
              )}
              
              {isFlipping && (
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Shuffle className="w-12 h-12 text-primary/60" />
                </motion.div>
              )}
            </Card>
          </motion.div>
        </div>

        {/* Control Button */}
        <Button 
          onClick={generateAnswer} 
          disabled={isFlipping}
          size="lg"
          variant="outline"
          className="w-full max-w-md mx-auto text-lg font-medium border-2 hover:bg-primary/5 transition-all duration-300"
        >
          {isFlipping ? 'Consulting the oracle...' : 'Ask the Oracle'}
        </Button>

        {/* Instructions */}
        <Card className="p-4 bg-primary/5 border-2">
          <div className="text-sm text-center space-y-2">
            <p className="font-medium text-primary/80">
              ✨ The Oracle awaits your question ✨
            </p>
            <p className="text-xs text-primary/60">
              Focus on your question, then tap to reveal your answer.
              The Oracle's wisdom comes with a twist of fate and a dash of destiny!
            </p>
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
} 