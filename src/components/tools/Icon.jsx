import React from 'react';

function Icon ({type = null, className = null, children}) {

    return (
        <div className={"iconTool" + (type !== null ? ' '+type : '') + (className !== null ? ' '+className : '')}>
            {children}
        </div>
    );
}

export default Icon;
