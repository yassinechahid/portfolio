"use client";

import { useEffect, useState } from "react";

interface AnimatedTextProps {
  phrases: string[];
  speed?: number;
  deleteSpeed?: number;
  delayBetweenPhrases?: number;
  className?: string;
}

export default function AnimatedText({
  phrases,
  speed = 100,
  deleteSpeed = 50,
  delayBetweenPhrases = 2000,
  className = "",
}: AnimatedTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentPhrase = phrases[currentPhraseIndex];

    if (isWaiting) {
      timer = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, delayBetweenPhrases);
    } else if (isDeleting) {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, deleteSpeed);
      } else {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    } else {
      if (displayedText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
        }, speed);
      } else {
        setIsWaiting(true);
      }
    }

    return () => clearTimeout(timer);
  }, [
    displayedText,
    currentPhraseIndex,
    isDeleting,
    isWaiting,
    phrases,
    speed,
    deleteSpeed,
    delayBetweenPhrases,
  ]);

  return (
    <span className={className}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
