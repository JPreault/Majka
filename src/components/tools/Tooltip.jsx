import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const Tooltip = ({ placement, content, children, options, arrow }) => {
    const targetRef = useRef(children);
    const tooltipRef = useRef(null);

    const [style, setStyle] = useState({ x: -2000, y: -2000, width: 0 });
    const [active, setActive] = useState(false);
    const [currentPlacement, setCurrentPlacement] = useState(placement);
    const [usedOptions, setUsedOptions] = useState(0);

    useOnClickOutside([tooltipRef, targetRef], (evt) => {
        if (options[usedOptions].mode !== 'static') {
            setActive(false);
        }
    });

    const styleCSS = {};
    let elClass = '';

    // On change la direction de la flèche en fonction du placement de la tooltip
    if (arrow) {
        switch (currentPlacement) {
        case 'top':
            elClass = 'with-arrow-bottom';
            break;
        case 'bottom':
            elClass = 'with-arrow-top';
            break;
        case 'left':
            elClass = 'with-arrow-right';
            break;
        case 'right':
            elClass = 'with-arrow-left';
            break;
        default:
            break;
        }
    }

    if (options[usedOptions].offset === undefined) {
        options[usedOptions].offset = {
            x: 0,
            y: 0
        };
    }

    // Calcul de la position de la tooltip par rapport à son élément d'ancrage
    useEffect(() => {
        if (active && targetRef.current && tooltipRef.current) {
            const rect = targetRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            let newPlacement = currentPlacement;

            // On regarde si on a la place pour mettre le tooltip
            if (placement === 'right' && (tooltipRect.width + rect.left + rect.width + 10 >= window.innerWidth)) {
                setUsedOptions(1);
                setCurrentPlacement('top');
                newPlacement = 'top';
            } else if (placement === 'right') {
                setUsedOptions(0);
                setCurrentPlacement('right');
                newPlacement = 'right';
            }

            if (placement === 'left' && (rect.left - tooltipRect.width + 10 < 0)) {
                setUsedOptions(1);
                setCurrentPlacement('top');
                newPlacement = 'top';
            } else if (placement === 'left') {
                setUsedOptions(0);
                setCurrentPlacement('left');
                newPlacement = 'left';
            }

            switch (newPlacement) {
            case 'right' :
                setStyle({
                    x: rect.left + rect.width + 10,
                    y: (rect.top + (rect.height / 2)) - tooltipRect.height / 2
                });
                break;
            case 'left' :
                setStyle({
                    x: rect.left - tooltipRect.width - 10,
                    y: (rect.top + (rect.height / 2)) - tooltipRect.height / 2
                });
                break;
            case 'top' :
                setStyle({
                    x: rect.left + (rect.width / 2) - tooltipRect.width / 2,
                    y: rect.top - tooltipRect.height - 10
                });
                break;
            case 'bottom' :
                setStyle({
                    x: rect.left + (rect.width / 2) - tooltipRect.width / 2,
                    y: rect.top + tooltipRect.height
                });
                break;
            default:
                break;
            }
        }
    }, [active, content, currentPlacement, placement]);

    useEffect(() => {
        // Permet sur Mobile de cacher la tooltip au scroll
        const onScroll = () => {
            setActive(false);
        };

        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Event pour cacher la tooltip au bout de X seconde
    // Sert notamment pour les tooltip avec des copy
    useEffect(() => {
        if (options[usedOptions].trigger && options[usedOptions].timer) {
            setActive(true);
            window.setTimeout(() => {
                setActive(false);
                options[usedOptions].updateTrigger(false);
            }, options[usedOptions].timer * 1000);
        }
    }, [options, usedOptions]);

    styleCSS.top = style.y + options[usedOptions].offset.y + 'px';
    styleCSS.left = style.x + options[usedOptions].offset.x + 'px';

    const events = {};

    if (options[usedOptions].mode !== 'static') {
        events.onMouseEnter = () => setActive(true);
        events.onMouseLeave = () => setActive(false);
    }

    if (options[usedOptions].maxWidth !== undefined) {
        styleCSS.maxWidth = options[usedOptions].maxWidth + 'px';
    }

    return <>
        {active && ReactDOM.createPortal(
            <div className={`tooltip ${elClass}`} style={styleCSS} ref={tooltipRef}>
                {content}
            </div>, document.getElementById('root'))}
        {React.cloneElement(children, {
            ref: targetRef,
            ...events
        })}
    </>;
};

export default Tooltip;
