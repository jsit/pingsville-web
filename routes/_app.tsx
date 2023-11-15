import { AppProps } from '$fresh/server.ts';
import SiteHeader from '../components/SiteHeader.tsx';
import PopularTags from '../components/PopularTags.tsx';

export default function App({ Component }: AppProps) {
  return (
    <html>
      <head>
        <link rel='stylesheet' href='https://use.typekit.net/vhk4dug.css' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossorigin='true'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap'
          rel='stylesheet'
        />
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Pingsville</title>
        <link rel='stylesheet' href='/style.min.css' />
      </head>
      <body>
        <SiteHeader />
        <div class='page-wrapper'>
          <main class='page-wrapper__main'>
            <Component />
          </main>
          <aside class='page-wrapper__aside'>
            <PopularTags />
          </aside>
        </div>
      </body>
    </html>
  );
}
