import { useParams } from "react-router-dom";
import { useEffect } from "react";
import InternalPageLayout from "./InternalPageLayout";

const Destination = () => {
  const { destinationName } = useParams<{ destinationName: string }>();

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
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Explore {formattedName}
          </h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              Discover the best experiences, activities, and attractions in {formattedName}.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Popular Activities</h2>
                <p className="text-gray-600">
                  Explore the most popular activities and experiences in {formattedName}.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Best Hotels</h2>
                <p className="text-gray-600">
                  Find the perfect accommodation for your stay in {formattedName}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <InternalPageLayout>
      {getDestinationContent()}
    </InternalPageLayout>
  );
};

export default Destination;