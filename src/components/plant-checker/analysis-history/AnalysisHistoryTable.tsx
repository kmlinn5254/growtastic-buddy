
import { Plant } from "@/types/plants";
import { formatDistanceToNow } from "date-fns";
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
          <TableHead>Name</TableHead>
          <TableHead>Condition</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {analyses.map((analysis) => (
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
              {analysis.description?.includes("Healthy") ? (
                <span className="text-green-600">Healthy</span>
              ) : (
                <span className="text-amber-600">Needs attention</span>
              )}
            </TableCell>
            <TableCell className="text-right text-muted-foreground">
              {analysis.createdAt 
                ? formatDistanceToNow(new Date(analysis.createdAt), { addSuffix: true })
                : "Unknown date"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AnalysisHistoryTable;
