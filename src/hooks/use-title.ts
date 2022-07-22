import React from 'react';

function useTitle(title: string) {
  React.useEffect(() => {
    const prevTitle = document.title;
    document.title = `Employee Dashboard - ${title}`;

    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}

export default useTitle;