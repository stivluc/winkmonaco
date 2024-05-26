export const filterByDate = (data, start, end) => {
  if (!start && !end) {
    // No date range selected, show all data
    // Sort articles by priority and date
    const sortedArticles = data?.sort((a, b) => {
      if (a.priority && !b.priority) {
        return -1; // a has priority, b doesn't, so a comes first
      } else if (!a.priority && b.priority) {
        return 1; // b has priority, a doesn't, so b comes first
      } else {
        // Both articles have priority or no priority, sort by date descending
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return sortedArticles;
  } else {
    // Filter articles by date range
    const filteredArticles = data?.filter((article) => {
      const articleDate = new Date(article.createdAt);
      const startDate = start ? new Date(new Date(start).getFullYear(), new Date(start).getMonth()) : null;
      const endDate = end
        ? new Date(new Date(end).getFullYear(), new Date(end).getMonth() + 1)
        : new Date(new Date(start).getFullYear() + 1, 1);

      return (startDate === null || articleDate >= startDate) && (endDate === null || articleDate < endDate);
    });

    // Sort articles by priority and date
    const sortedArticles = filteredArticles.sort((a, b) => {
      if (a.priority && !b.priority) {
        return -1; // a has priority, b doesn't, so a comes first
      } else if (!a.priority && b.priority) {
        return 1; // b has priority, a doesn't, so b comes first
      } else {
        // Both articles have priority or no priority, sort by date descending
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return sortedArticles;
  }
};
