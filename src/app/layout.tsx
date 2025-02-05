import './globals.css'
import {ClusterProvider} from '@/components/cluster/cluster-data-access'
import {SolanaProvider} from '@/components/solana/solana-provider'
import {UiLayout} from '@/components/ui/ui-layout'
import {ReactQueryProvider} from './react-query-provider'

const links: { label: string; path: string }[] = [
  { label: 'Ask a Doula', path: '/ask' },
  { label: 'My Questions', path: '/my-questions' },
  { label: 'Marketplace', path: '/marketplace' },
]

export const metadata = {
  title: 'AI Digital Doula',
  description: 'Your trusted companion through pregnancy and parenthood',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <ClusterProvider>
            <SolanaProvider>
              <UiLayout links={links}>{children}</UiLayout>
            </SolanaProvider>
          </ClusterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
