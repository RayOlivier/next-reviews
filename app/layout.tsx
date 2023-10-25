
import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function RootLayout({
    children,
  }: LayoutProps){
    return(
        <html lang="en">
            <body>
              <header>
                [header]
              </header>
                {children}
                <footer>
                  [footer]
                </footer>
            </body>
        </html>
    )
}