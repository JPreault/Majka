import { useEffect } from 'react';

const useOnClickOutside = (ref, handler) =>
{
    useEffect(() => {
        const listener = (event) => {
            if (Array.isArray(ref)) {
                let needToHandle = 0;
                ref.forEach(reference => {
                    if (reference.current && !reference.current.contains(event.target)) {
                        needToHandle++;
                    }
                });
                if (needToHandle === ref.length) handler('2');
            } else {
                if (ref.current && !ref.current.contains(event.target)) {
                    handler('2-2');
                }
            }
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
};

export default useOnClickOutside;
