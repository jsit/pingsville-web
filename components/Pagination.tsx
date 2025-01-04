export default ({
  totalItems,
  currentPage,
  perPage,
}: {
  totalItems: number;
  currentPage: number;
  perPage: number;
}) => {
  const totalPages = Math.ceil(totalItems / perPage);

  return totalPages
    ? (
      <nav class='pagination'>
        <ul class='pagination__list'>
          {new Array(totalPages).fill(0).map((_, i) => {
            const humanPage = i + 1;

            return (
              <li>
                {currentPage == humanPage
                  ? <>{humanPage}</>
                  : <a href={`?page=${humanPage}`}>{humanPage}</a>}
              </li>
            );
          })}
        </ul>
      </nav>
    )
    : <></>;
};
