
import { MetricCards } from "./_components/metric-cards";
import { PerformanceOverview } from "./_components/performance-overview";

export default function page() {
  return (
    <div className="min-h-full px-4 py-2 gap-4 md:gap-6">
      <MetricCards />
      <PerformanceOverview />
    </div>
  );
}
