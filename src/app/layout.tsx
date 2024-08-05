import { Inter, Poppins } from 'next/font/google';
import '../styles/index.css';
import '../styles/normalize.css';
import '../styles/App.css';
const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({ weight: ['400', '500', '600'], subsets: ['latin'] });
export const metadata = {
  title: 'NoSponger',
  description: 'NoSponger - the ultimate jobs search app!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
