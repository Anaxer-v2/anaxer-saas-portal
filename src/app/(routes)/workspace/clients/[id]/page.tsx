import { Metadata } from 'next'
import ClientsOverview from '@/app/components/dashboard/clients/clientsOverview'

type PageParams = Promise<{ id: string }>

export async function generateMetadata({ 
  params 
}: { 
  params: PageParams
}): Promise<Metadata> {
  const resolvedParams = await params
  return {
    title: `Client ${resolvedParams.id} - Dashboard`,
  }

}

interface PageProps {
  params: PageParams
}
const Page = async ({ params }: PageProps) => {
  const resolvedParams = await params
  return <ClientsOverview clientId={resolvedParams.id} />
}

export default Page
