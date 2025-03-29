
import { Plant } from "@/types/plants";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface AnalysisHistoryTableProps {
  analyses: Plant[];
  onSelectAnalysis: (plant: Plant) => void;
}

const AnalysisHistoryTable = ({ analyses, onSelectAnalysis }: AnalysisHistoryTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Plant</TableHead>
          <TableHead>Disease</TableHead>
          <TableHead>Condition</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {analyses.map((analysis) => {
          // Extract condition from description if available
          let condition = "Unknown";
          if (analysis.description) {
            // Look for common condition phrases in the description
            const conditionPhrases = [
              "Healthy with minor issues", "Healthy", "Mildly distressed", "Stressed", 
              "Needs attention", "Minor problems", "Showing minor stress",
              "Needs care adjustments"
            ];
            
            for (const phrase of conditionPhrases) {
              if (analysis.description.includes(phrase)) {
                condition = phrase;
                break;
              }
            }
          }
          
          return (
            <TableRow 
              key={analysis.id} 
              className="cursor-pointer hover:bg-muted/60"
              onClick={() => onSelectAnalysis(analysis)}
            >
              <TableCell>
                <div className="w-12 h-12 rounded-md overflow-hidden">
                  <img 
                    src={analysis.image} 
                    alt={analysis.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{analysis.name}</TableCell>
              <TableCell>
                {condition.includes("Healthy") ? (
                  <span className="text-green-600">{condition}</span>
                ) : (
                  <span className="text-amber-600">{condition}</span>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default AnalysisHistoryTable;
