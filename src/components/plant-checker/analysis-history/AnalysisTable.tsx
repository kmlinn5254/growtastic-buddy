
import { Plant } from "@/types/plants";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface AnalysisTableProps {
  analyses: Plant[];
  extractCondition: (description?: string) => { text: string; isHealthy: boolean };
  onSelectAnalysis: (plant: Plant) => void;
  showDate?: boolean;
}

const AnalysisTable = ({ 
  analyses, 
  extractCondition, 
  onSelectAnalysis,
  showDate = false
}: AnalysisTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Plant</TableHead>
          <TableHead>Disease</TableHead>
          <TableHead>Condition</TableHead>
          {showDate && <TableHead className="text-right">Date</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {analyses.map((analysis) => {
          const condition = extractCondition(analysis.description);
          
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
                {condition.isHealthy ? (
                  <span className="text-green-600">{condition.text}</span>
                ) : (
                  <span className="text-amber-600">{condition.text}</span>
                )}
              </TableCell>
              {showDate && (
                <TableCell className="text-right text-muted-foreground">
                  {analysis.createdAt 
                    ? new Date(analysis.createdAt).toLocaleDateString()
                    : "Unknown date"}
                </TableCell>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default AnalysisTable;
