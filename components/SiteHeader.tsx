import PopularTags from '../components/PopularTags.tsx';

export default function SiteHeader() {
  return (
    <>
      <header>
        <p>
          <a href='/'>Pingsville</a>
        </p>
      </header>
      <PopularTags />
    </>
  );
}
