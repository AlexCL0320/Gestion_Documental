'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2, Sparkles } from 'lucide-react';
import { useComplianceReport } from '@/hooks/use-compliance-report';

export function GenerateReport() {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending, report } = useComplianceReport();

  const handleGenerateReport = () => {
    mutate();
    setIsOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleGenerateReport}
        disabled={isPending}
        className="bg-emerald-600 text-white hover:bg-emerald-700"
      >
        {isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="mr-2 h-4 w-4" />
        )}
        Generar Reporte IA
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-600" />
              Reporte de Cumplimiento
            </DialogTitle>
            <DialogDescription>
              Reporte de cumplimiento generado por IA basado en el estado actual de los documentos.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto rounded-md border bg-muted/20 p-4">
            {report ? (
              <pre className="whitespace-pre-wrap font-sans text-sm">{report}</pre>
            ) : (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
