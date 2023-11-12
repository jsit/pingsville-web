import { AppProps } from '$fresh/server.ts';
import SiteHeader from '../components/SiteHeader.tsx';

export default function App({ Component }: AppProps) {
  return (
    <html>
      <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Pingsville</title>
        <link rel='stylesheet' href='/style.min.css' />
      </head>
      <body>
        <SiteHeader />
        <Component />
      </body>
    </html>
  );
}
