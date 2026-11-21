export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="صفحات المدونة" className="d-flex justify-content-center mt-5">
      <ul className="pagination-custom">
        {/* السهم "السابق" - في الـ RTL بيبقى ناحية اليمين */}
        <li>
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="السابق"
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </li>

        {pages.map((page) => (
          <li key={page}>
            <button
              className={page === currentPage ? "active" : ""}
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          </li>
        ))}

        <li>
          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="التالي"
          >
            <i className="bi bi-chevron-left"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
}
