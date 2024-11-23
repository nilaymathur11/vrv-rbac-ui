import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from '@/app/components/Header'
import { ReduxProvider } from '@/redux/reduxProvider'
import { AppSidebar } from './components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RBAC Dashboard',
  description: 'A beautiful and innovative Role-Based Access Control dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex h-screen overflow-hidden bg-background">
              <div className="hidden md:block w-[22%] border-r border-border">
                <AppSidebar />
              </div>
              <div className="flex flex-col flex-1 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-6">
                  {children}
                </main>
              </div>
            </div>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}

