import { useEffect, useState } from 'react';

const getWidth = () => window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

const getHeight = () => window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

const useOnResize = (fnToExecute) => {
    // On conserve la largeur actuelle de la fenêtre
    const [width, setWidth] = useState(getWidth());
    const [height, setHeight] = useState(getHeight());

    useEffect(() => {
        // On va implémenter un timer pour éviter d'exécuter trop régulièrement le hook
        let timeout = null;

        const resizeListener = () => {
            // Préviens l'éxécution du précédent timeout
            if (timeout !== null) {
                clearTimeout(timeout);
            }

            // On update l'état après 150ms
            timeout = window.setTimeout(() => {
                setWidth(getWidth());
                setHeight(getHeight());
                fnToExecute(getWidth(), getHeight());
            }, 150);
        };

        window.addEventListener('resize', resizeListener);

        return () => {
            window.removeEventListener('resize', resizeListener);
        };
    }, []);
};

export default useOnResize;
