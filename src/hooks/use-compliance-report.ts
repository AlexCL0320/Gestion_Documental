'use client';
import { useState } from 'react';
import { documents } from '@/app/lib/data';
import {
  generateComplianceReport,
  GenerateComplianceReportInput,
} from '@/backend/ai/flows/generate-compliance-report';

export function useComplianceReport() {
  const [report, setReport] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async () => {
    setIsPending(true);
    setError(null);
    setReport(null);

    try {
      const documentSummaries = documents.map((doc) => ({
        documentName: doc.name,
        status: doc.status,
        details: `Last updated by ${doc.teacher.name}, version ${doc.version}.`,
      }));

      const input: GenerateComplianceReportInput = { documentSummaries };
      const result = await generateComplianceReport(input);
      setReport(result.report);
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
      } else {
        setError(new Error('An unknown error occurred'));
      }
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, report, isPending, error };
}
