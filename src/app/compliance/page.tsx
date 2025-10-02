import { AppLayout } from '@/components/layout/app-layout';
import { ComplianceChart } from '@/components/compliance/compliance-chart';
import { DocumentsTable } from '@/components/dashboard/documents-table';

export default function CompliancePage() {
  return (
    <AppLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Monitor de Cumplimiento
            </h1>
            <p className="text-muted-foreground">
            Visualiza el estado de la documentación y el cumplimiento de las entregas.
            </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ComplianceChart />
        </div>
        <div>
            <DocumentsTable showFilter={true}/>
        </div>
      </div>
    </AppLayout>
  );
}