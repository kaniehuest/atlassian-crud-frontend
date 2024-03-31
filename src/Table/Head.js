export const createHead = () => {
  return {
    cells: [
      {
        key: 'name',
        content: 'Name',
        isSortable: true,
      },
      {
        key: 'party',
        content: 'Creation Date',
        shouldTruncate: true,
        isSortable: true,
      },
      {
        key: 'term',
        content: 'Status',
        shouldTruncate: true,
        isSortable: true,
      },
      {
        key: 'content',
        content: 'Serial',
        shouldTruncate: true,
      },
      {
        key: 'content',
        content: 'Brand',
        shouldTruncate: true,
      },
      {
        key: 'content',
        content: 'Model',
        shouldTruncate: true,
      },
      {
        key: 'Options',
        content: 'Options',
      },
    ],
  };
};

export const head = createHead(true);