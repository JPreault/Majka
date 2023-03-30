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

  return (<div className='page'>
    <div className='pageChild headband'></div>
    <div className='pageChild content'>
      {contentPage !== null && contentPage}
    </div>
  </div>);
}

export default Page;