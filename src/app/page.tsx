'use client';
import { AppLayout } from '@/components/layout/app-layout';
import { OverviewCards } from '@/components/dashboard/overview-cards';
import { DocumentsTable } from '@/components/dashboard/documents-table';
import { RecentActivity } from '@/components/dashboard/recent-activity';

export default function DashboardPage() {

  return (
    <AppLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Gestion del Curso
        </h1>
        <p className="text-muted-foreground">
          Resumen de Cumplimiento de la Gestión Documental Docente.
        </p>
        <div className="space-y-4">
          <OverviewCards />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="lg:col-span-4">
              <DocumentsTable />
            </div>
            <div className="lg:col-span-3">
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
