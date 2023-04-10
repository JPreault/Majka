import React, { useEffect, useState } from 'react';
import HomePage from './Homepage';
import Game1 from './Game1';
import Game2 from './Game2';
import Game3 from './Game3';
import Setting from './Setting';

function Page ({page = null}) {
  const [contentPage, setContentPage] = useState('homepage');

  useEffect(() => {
    switch (page) {
      case "homepage":
        setContentPage(<HomePage/>)
        break;
      case "game1":
        setContentPage(<Game1/>)
        break;
      case "game2":
        setContentPage(<Game2/>)
        break;
      case "game3":
        setContentPage(<Game3/>)
        break;
      case "color":
        setContentPage(<Setting/>)
        break;
      default:
        break;
    }
  }, [page])  

  return (<div className='page scrollOnY'>
    <div className='pageChild headband'></div>
    <div className='pageChild content'>
      {contentPage !== null && contentPage}
    </div>
  </div>);
}

export default Page;