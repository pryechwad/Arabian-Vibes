import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedDestinations from "@/components/sections/FeaturedDestinations";
import QuickLinksSection from "@/components/sections/QuickLinksSection";
import Footer from "@/components/layout/Footer";
import { useCards } from "@/hooks/useCards";
import { useSliders } from "@/hooks/useSliders";
import { DynamicCards } from "@/components/DynamicCards";
import { DynamicSlider } from "@/components/ui/DynamicSlider";
import { useState, Suspense, lazy } from "react";
import InternalPageLayout from "./InternalPageLayout";
import { measureComponentRender } from "@/lib/performance";

// Lazy load heavy components
const PopularExperiences = lazy(() => import("@/pages/PopularExp"));

// Loading component for PopularExperiences
const PopularExperiencesLoader = () => (
  <div className="py-16 bg-gradient-to-b from-blue-50/30 to-white">
    <div className="container mx-auto px-4">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-3xl h-64"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);


const Index = () => {
  const endTimer = measureComponentRender('Index');
  
  // Original data fetching
  const { 
    data: cardsResponse, 
    isLoading: cardsLoading, 
    error: cardsError 
  } = useCards({ page: 'home', limit: 8 });

  // Fetch slider data
  const { 
    data: slidersResponse, 
    isLoading: slidersLoading, 
    error: slidersError 
  } = useSliders({ page: 'home', limit: 5 });

  // State for internal page
  const [showInternalPage, setShowInternalPage] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // End performance measurement
  endTimer();

  return (
    <div className="min-h-screen bg-background">
      {showInternalPage ? (
        <InternalPageLayout
          title={selectedItem?.title || "Experience Details"}
          description="Discover amazing experiences and activities."
          item={selectedItem}
          onClose={() => {
            setShowInternalPage(false);
            setSelectedItem(null);
          }}
        />
      ) : (
        <>
          <Header />
          <main>
            <HeroSection />
            <FeaturedDestinations />
            
            {/* Lazy load PopularExperiences */}
            <Suspense fallback={<PopularExperiencesLoader />}>
              <PopularExperiences 
                city="Dubai"
                title="Most Popular Experiences in UAE"
                description="Culture, nature, thrills, and record-breaking experiences—Dubai is the place to seek out everything you imagine and beyond. Find it all here!"
              />
            </Suspense>
           
            <Suspense fallback={<div className="py-8 bg-gray-50 animate-pulse"><div className="h-32 bg-gray-200 rounded mx-4"></div></div>}>
              <QuickLinksSection />
            </Suspense>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
