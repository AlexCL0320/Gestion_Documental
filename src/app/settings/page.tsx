import { AppLayout } from '@/components/layout/app-layout';

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Ajustes
        </h1>
        <p className="text-muted-foreground">
          Aquí puedes configurar los ajustes de la aplicación.
        </p>
      </div>
    </AppLayout>
  );
}
