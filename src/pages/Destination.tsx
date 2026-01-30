import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Destination = () => {
  const { destinationName } = useParams<{ destinationName: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    // Update document title based on destination
    if (destinationName) {
      const formattedName = destinationName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      document.title = `${formattedName} - Arabian Vibes`;
    }
  }, [destinationName]);

  const getDestinationContent = () => {
    if (!destinationName) return null;

    const formattedName = destinationName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <div className="relative h-48 sm:h-64 md:h-80 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="absolute inset-0 bg-black/30" />
          
          {/* Mobile Back Button */}
          <div className="absolute top-4 left-4 z-10">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(-1)}
              className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 border-white/20 h-8 w-8 p-0 sm:h-10 sm:w-auto sm:px-3"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">Back</span>
            </Button>
          </div>
          
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="text-white">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-4">
                Explore {formattedName}
              </h1>
              <p className="text-sm sm:text-lg opacity-90">
                Discover amazing experiences in {formattedName}
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4">About {formattedName}</h2>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {formattedName} offers incredible experiences for travelers. From stunning attractions 
                    to cultural landmarks, there's something for everyone to enjoy.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4">Popular Activities</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-semibold mb-2">Sightseeing Tours</h3>
                      <p className="text-sm text-gray-600">Explore the best attractions and landmarks</p>
                    </div>
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-semibold mb-2">Cultural Experiences</h3>
                      <p className="text-sm text-gray-600">Immerse yourself in local culture</p>
                    </div>
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-semibold mb-2">Adventure Activities</h3>
                      <p className="text-sm text-gray-600">Thrilling experiences and adventures</p>
                    </div>
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-semibold mb-2">Food & Dining</h3>
                      <p className="text-sm text-gray-600">Taste authentic local cuisine</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-4">Quick Info</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Best Time to Visit:</span>
                      <span className="font-medium">Year Round</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Currency:</span>
                      <span className="font-medium">AED</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Language:</span>
                      <span className="font-medium">Arabic, English</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-4">Need Help?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Our travel experts are here to help you plan your perfect trip to {formattedName}.
                  </p>
                  <button className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  };

  return getDestinationContent();
};

export default Destination;