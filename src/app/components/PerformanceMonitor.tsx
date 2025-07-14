"use client";

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Handle different types of performance entries
        if ('value' in entry) {
          console.log(`${entry.name}: ${entry.value}`);
        } else if ('startTime' in entry) {
          console.log(`${entry.name}: ${entry.startTime}`);
        }
        
        // Send to analytics service (example)
        // analytics.track('web_vital', {
        //   name: entry.name,
        //   value: 'value' in entry ? entry.value : entry.startTime,
        //   id: entry.id,
        // });
      }
    });

    // Observe LCP, FID, CLS
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

    // Monitor FCP
    const fcpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if ('startTime' in entry) {
          console.log(`FCP: ${entry.startTime}`);
        }
      }
    });
    fcpObserver.observe({ entryTypes: ['paint'] });

    // Monitor resource loading
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resourceEntry = entry as PerformanceResourceTiming;
          if (resourceEntry.duration > 1000) {
            console.warn(`Slow resource: ${resourceEntry.name} took ${resourceEntry.duration}ms`);
          }
        }
      }
    });
    resourceObserver.observe({ entryTypes: ['resource'] });

    return () => {
      observer.disconnect();
      fcpObserver.disconnect();
      resourceObserver.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
}