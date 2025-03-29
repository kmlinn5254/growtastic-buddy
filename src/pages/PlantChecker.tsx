
import Navigation from "@/components/Navigation";
import PlantCheckerContainer from "@/components/plant-checker/PlantCheckerContainer";
import PlantCheckerLayout from "@/components/plant-checker/PlantCheckerLayout";

const PlantChecker = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <PlantCheckerContainer>
          {({
            preview,
            description,
            isAnalyzing,
            isSaving,
            result,
            handleFileChange,
            handleTextSubmit,
            handleImageSubmit,
            handleDescriptionChange,
            saveResults,
            resetAnalysis
          }) => (
            <PlantCheckerLayout
              preview={preview}
              description={description}
              isAnalyzing={isAnalyzing}
              isSaving={isSaving}
              result={result}
              handleFileChange={handleFileChange}
              handleTextSubmit={handleTextSubmit}
              handleImageSubmit={handleImageSubmit}
              handleDescriptionChange={handleDescriptionChange}
              saveResults={saveResults}
              resetAnalysis={resetAnalysis}
            />
          )}
        </PlantCheckerContainer>
      </main>
    </div>
  );
};

export default PlantChecker;
