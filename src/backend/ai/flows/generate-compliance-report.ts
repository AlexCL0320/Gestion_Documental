'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating compliance reports based on existing documentation in Docentix.
 *
 * - generateComplianceReport - A function that generates a comprehensive report for auditing purposes.
 * - GenerateComplianceReportInput - The input type for the generateComplianceReport function.
 * - GenerateComplianceReportOutput - The return type for the generateComplianceReport function.
 */

import {ai} from '@/backend/ai/genkit';
import {z} from 'genkit';

const GenerateComplianceReportInputSchema = z.object({
  documentSummaries: z.array(
    z.object({
      documentName: z.string().describe('Name of the document.'),
      status: z.string().describe('Current status of the document (e.g., Submitted, Approved, Rejected).'),
      details: z.string().describe('Any additional details or comments about the document.'),
    })
  ).describe('Summaries of all documents in Docentix.'),
});
export type GenerateComplianceReportInput = z.infer<typeof GenerateComplianceReportInputSchema>;

const GenerateComplianceReportOutputSchema = z.object({
  report: z.string().describe('A comprehensive compliance report generated based on the provided document summaries.'),
});
export type GenerateComplianceReportOutput = z.infer<typeof GenerateComplianceReportOutputSchema>;

export async function generateComplianceReport(input: GenerateComplianceReportInput): Promise<GenerateComplianceReportOutput> {
  return generateComplianceReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateComplianceReportPrompt',
  input: {schema: GenerateComplianceReportInputSchema},
  output: {schema: GenerateComplianceReportOutputSchema},
  prompt: `You are an AI assistant specialized in generating compliance reports for academic institutions, specifically for TecNM (Tecnológico Nacional de México).

  Your task is to analyze the provided document summaries and generate a comprehensive report that highlights the overall compliance status, identifies potential issues, and provides recommendations for improvement.

  Document Summaries:
  {{#each documentSummaries}}
  - Document Name: {{this.documentName}}
  Status: {{this.status}}
  Details: {{this.details}}
  {{/each}}

  Based on the document summaries above, generate a detailed report that includes:
  1. An executive summary of the overall compliance status.
  2. Identification of any documents that are not in compliance or have potential issues.
  3. Recommendations for improving compliance and addressing identified issues.

  The report should be well-structured, clear, and concise, suitable for presentation to TecNM's quality assurance teams. Focus on actionable insights and practical recommendations. Adhere to a professional and formal tone throughout the report.
  Ensure that the report emphasizes adherence to TecNM's quality guidelines and standards.
  The report should be optimized for keywords related to academic document management and institutional quality compliance.
  Keywords: Gestión Documental Docente, Digitalización Académica, Instrumentación Didáctica, Jefatura de Proyectos de Docencia, Automatización Académica, Monitoreo de Evidencias, Control de Calidad TecNM, Plataforma Docentix.
  Make sure to mention Docentix as a tool to automatically generate the report, and improve compliance.
  Report:
  `,
});

const generateComplianceReportFlow = ai.defineFlow(
  {
    name: 'generateComplianceReportFlow',
    inputSchema: GenerateComplianceReportInputSchema,
    outputSchema: GenerateComplianceReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
