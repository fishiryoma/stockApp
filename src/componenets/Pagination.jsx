function Pagination({ page, setPage, datas }) {
  return (
    <div className="join mt-6 mb-3 flex justify-center">
      {page > 1 ? (
        <button
          className="join-item btn btn-outline btn-warning btn-sm"
          onClick={() => setPage(page - 1)}
        >
          上一頁
        </button>
      ) : (
        ""
      )}
      {datas.length ? (
        <button
          className="join-item btn btn-warning btn-sm"
          onClick={() => {
            setPage(page + 1);
          }}
        >
          下一頁
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default Pagination;
