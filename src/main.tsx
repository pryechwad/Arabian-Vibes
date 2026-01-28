import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { performanceMonitor } from './lib/performance.ts'

// Start performance monitoring
const endTimer = performanceMonitor.startTimer('app-initialization');

createRoot(document.getElementById("root")!).render(<App />);

// End performance monitoring
endTimer();

// Log performance metrics in development
if (import.meta.env.DEV) {
  setTimeout(() => {
    const metrics = performanceMonitor.getMetrics();
    console.log('Performance Metrics:', metrics);
  }, 2000);
}