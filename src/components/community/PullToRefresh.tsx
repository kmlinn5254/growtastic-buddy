
import { RefreshCw } from "lucide-react";

interface PullToRefreshProps {
  isRefreshing: boolean;
}

const PullToRefresh = ({ isRefreshing }: PullToRefreshProps) => {
  if (!isRefreshing) return null;
  
  return (
    <div className="flex justify-center mb-4 text-plant-primary animate-pulse">
      <RefreshCw className="h-6 w-6 animate-spin" />
      <span className="ml-2">Refreshing...</span>
    </div>
  );
};

export default PullToRefresh;
