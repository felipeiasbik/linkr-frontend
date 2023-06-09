import { useRef, useEffect } from 'react';

export default function InfinityScroll({ callback, makeNewRequest }) {
  const divInfiniteScrollRef = useRef(null);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(async ([entry]) => {
      const ratio = entry.intersectionRatio;

      if (ratio > 0) {
        callback();
        console.log('neotu');
      }
    });
    if (divInfiniteScrollRef.current) {
      intersectionObserver.observe(divInfiniteScrollRef.current);
    }

    return () => {
      intersectionObserver.disconnect();
    };
  }, [divInfiniteScrollRef]);

  const data = makeNewRequest ? <div ref={divInfiniteScrollRef} /> : <h3>No more posts...</h3>;
  return data;
}
