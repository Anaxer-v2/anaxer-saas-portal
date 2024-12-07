import ClientsOverview from '@/app/components/dashboard/clients/clientsOverview';

export default function ClientPage({ params }: { params: { id: string } }) {
  return (
    <>
      <ClientsOverview clientId={params.id} />
    </>
  );
}