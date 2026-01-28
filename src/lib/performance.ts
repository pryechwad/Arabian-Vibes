// Performance monitoring utilities
interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
}

interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
}

interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers() {
    // Core Web Vitals observer
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        // LCP (Largest Contentful Paint)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.recordMetric('LCP', lastEntry.startTime);
          console.log(`LCP: ${lastEntry.startTime.toFixed(2)}ms`);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);

        // FID (First Input Delay)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: PerformanceEntry) => {
            const fidEntry = entry as PerformanceEventTiming;
            this.recordMetric('FID', fidEntry.processingStart - fidEntry.startTime);
            console.log(`FID: ${(fidEntry.processingStart - fidEntry.startTime).toFixed(2)}ms`);
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);

        // CLS (Cumulative Layout Shift)
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          const entries = list.getEntries();
          entries.forEach((entry: PerformanceEntry) => {
            const clsEntry = entry as LayoutShift;
            if (!clsEntry.hadRecentInput) {
              clsValue += clsEntry.value;
            }
          });
          this.recordMetric('CLS', clsValue);
          console.log(`CLS: ${clsValue.toFixed(4)}`);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch (error) {
        console.warn('Performance observers not supported:', error);
      }
    }
  }

  recordMetric(name: string, value: number) {
    this.metrics.push({
      name,
      value,
      timestamp: Date.now(),
    });
  }

  startTimer(name: string): () => void {
    const startTime = performance.now();
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      this.recordMetric(name, duration);
      console.log(`Performance: ${name} took ${duration.toFixed(2)}ms`);
    };
  }

  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  getAverageMetric(name: string): number {
    const relevantMetrics = this.metrics.filter(m => m.name === name);
    if (relevantMetrics.length === 0) return 0;
    
    const sum = relevantMetrics.reduce((acc, metric) => acc + metric.value, 0);
    return sum / relevantMetrics.length;
  }

  clearMetrics() {
    this.metrics = [];
  }

  disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Utility functions
export const measureComponentRender = (componentName: string) => {
  return performanceMonitor.startTimer(`component-render-${componentName}`);
};

export const measureApiCall = (endpoint: string) => {
  return performanceMonitor.startTimer(`api-call-${endpoint}`);
};