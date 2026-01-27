import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AbuDhabiPage = lazy(() => import("./pages/AbuDhabiActivities"));
const DubaiActivitiesPage = lazy(() => import("./pages/DubaiActivities"));
const RasAlKhaimahActivitiesPage = lazy(() => import("./pages/RasAlKhaimahActivities"));
const OmanActivitiesPage = lazy(() => import("./pages/OmanActivities"));
const Activities = lazy(() => import("./pages/Activities"));
const Hotels = lazy(() => import("./pages/Hotels"));
const Holidays = lazy(() => import("./pages/Holidays"));
const Visas = lazy(() => import("./pages/Visas"));
const Cruise = lazy(() => import("./pages/Cruise"));
const Contact = lazy(() => import("./pages/Contact"));
const AbuDhabiExperience = lazy(() => import("./pages/AbuDhabiExperience"));
const AboutUs = lazy(() => import("./pages/AboutUs"));

import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { AuthProvider } from "@/contexts/AuthContext";

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-lg font-semibold text-primary animate-pulse">Loading...</p>
    </div>
  </div>
);

// Optimized QueryClient configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CurrencyProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter 
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true
            }}
          >
          
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/activities/dubai" element={<DubaiActivitiesPage />} />
                <Route path="/activities/abu-dhabi" element={<AbuDhabiPage />} />
                <Route path="/activities/ras-al-khaimah" element={<RasAlKhaimahActivitiesPage />} />
                <Route path="/activities/oman" element={<OmanActivitiesPage />} />
                <Route path="/experiences/abu-dhabi" element={<AbuDhabiExperience />} />

                <Route path="/hotelsearch" element={<Hotels />} />
                <Route path="/holidays" element={<Holidays />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/cruise" element={<Cruise />} />
                <Route path="/visas" element={<Visas />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about-us" element={<AboutUs />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </CurrencyProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
