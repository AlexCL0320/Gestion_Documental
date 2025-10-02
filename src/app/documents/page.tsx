import { AppLayout } from '@/components/layout/app-layout';
import { DocumentUploader } from '@/components/documents/document-uploader';
import { SubmissionStatus } from '@/components/documents/submission-status';

export default function DocumentsPage() {
  return (
    <AppLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Gestión de Evidencia</h1>
            <p className="text-muted-foreground">Carga y gestiona los archivos de tu instrumentación didáctica.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <DocumentUploader />
            </div>
            <div className="lg:col-span-1">
                <SubmissionStatus />
            </div>
        </div>
      </div>
    </AppLayout>
  );
}
