import styles from "./BlogPagination.module.scss";

const BlogPagination = ({
  toltalBlogs,
  blogPerPage,
  currentPage,
  paginate,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(toltalBlogs / blogPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={styles.basicPagination}>
      <nav>
        <ul>
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className={currentPage === number ? styles.current : ""}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default BlogPagination;
