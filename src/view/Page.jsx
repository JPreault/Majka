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

  return (<div className='pageContent'>
    <div className='headbandTheme'></div>
    {contentPage !== null && contentPage}
  </div>);
}

export default Page;