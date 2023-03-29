import React, { useEffect, useState } from 'react';
import HomePage from './Homepage';

function Page ({page = null}) {

  const [contentPage, setContentPage] = useState('homepage');

  useEffect(() => {
    switch (page) {
      case "homepage":
        setContentPage(<HomePage/>)
        break;
      default:
        break;
    }
  }, [page])  

  return (<>
    {contentPage !== null && contentPage}
  </>);
}

export default Page;
