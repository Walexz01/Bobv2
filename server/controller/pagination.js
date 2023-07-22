const getPagination = (page, size, count) => {
  const limit = size ? size : 20;
  const offset = page * limit;
  const totalPages = Math.ceil(count / limit);
  return { limit, offset, totalPages };
};

module.exports = { getPagination };
