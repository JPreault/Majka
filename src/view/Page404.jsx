import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundIcon from '../images/jpg/404.png';

function Page404 () {
    const navigate = useNavigate();

    return (<div className='container__notfound'>
        <img src={NotFoundIcon} alt={'404'} draggable={false}></img>
        <p>La page que vous cherchez semble introuvable</p>
        <p onClick={() => navigate('/')} className='link clickable'>Retour vers la page d&apos;accueil</p>
    </div>);
}

export default Page404;
