import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://js.stripe.com/v3/"></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
