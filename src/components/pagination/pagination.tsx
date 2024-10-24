import { Fragment } from "react/jsx-runtime";
import { PaginationItem } from "./pagination-item";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

export function Pagination({
  onPageChange,
  currentPage = 1,
  registersPerPage = 10,
  totalCountOfRegisters,
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];

  const firstRegisterOnPage =
    currentPage === 1 ? 1 : (currentPage - 1) * registersPerPage + 1;
  const lastRegisterOnPage =
    currentPage * registersPerPage > totalCountOfRegisters
      ? totalCountOfRegisters
      : currentPage * registersPerPage;

  const showFirstPageLink = currentPage > 1 + siblingsCount;
  const showEllipsisBeforeFirstPageLink = currentPage > 2 + siblingsCount;

  const showLastPageLink = currentPage + siblingsCount < lastPage;
  const showEllipsisBeforeLastPageLink =
    currentPage + 1 + siblingsCount < lastPage;

  return (
    <footer className="flex gap-2 mt-4 justify-between items-center">
      <div className="text-foreground font-medium">
        <span>{firstRegisterOnPage}</span> - <span>{lastRegisterOnPage}</span>{" "}
        de <span>{totalCountOfRegisters}</span>
      </div>

      <div className="flex gap-2">
        {showFirstPageLink && (
          <Fragment>
            <PaginationItem onPageChange={onPageChange} number={1} />
            {showEllipsisBeforeFirstPageLink && <span>...</span>}
          </Fragment>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => (
            <PaginationItem
              onPageChange={onPageChange}
              key={page}
              number={page}
            />
          ))}

        <PaginationItem
          isCurrent
          number={currentPage}
          onPageChange={onPageChange}
        />

        {nextPages.length > 0 &&
          nextPages.map((page) => (
            <PaginationItem
              onPageChange={onPageChange}
              key={page}
              number={page}
            />
          ))}

        {showLastPageLink && (
          <Fragment>
            {showEllipsisBeforeLastPageLink && <span>...</span>}
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </Fragment>
        )}
      </div>
    </footer>
  );
}
