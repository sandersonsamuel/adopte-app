import Link from "next/link";
import { IconButton } from "../ui/icon-button";
import { usePagination } from "./usePagination";
import classNames from "classnames";

export type PaginationProps = {
  total: number;
  current: number;
  limit: number;
};

export const Pagination = ({ current, limit, total }: PaginationProps) => {
  const { isCurrentPage, pages } = usePagination({
    current,
    limit,
    total,
  });

  return (
    <>
      <ul className="flex gap-2">
        {pages.map((page, index) => (
          <li key={index}>
            <Link href={`?page=${page}`}>
              <IconButton
                className={classNames(
                  "disabled:cursor-not-allowed",
                  isCurrentPage(+page) && "blue-gradient text-white"
                )}
                disabled={isCurrentPage(+page) || typeof page === "string"}
                size="md"
              >
                {page}
              </IconButton>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
