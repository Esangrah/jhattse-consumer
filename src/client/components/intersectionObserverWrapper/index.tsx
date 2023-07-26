import React, { useRef, useEffect, useState } from 'react';

interface IntersectionObserverProps {
  children: React.ReactNode;
  onChange: (isIntersecting: boolean) => void;
}

const IntersectionObserverWrapper = (props: IntersectionObserverProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        props.onChange(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current!);
      }
    };
  }, []);

  return <div ref={targetRef}>{props.children}</div>;
};

export default IntersectionObserverWrapper;
