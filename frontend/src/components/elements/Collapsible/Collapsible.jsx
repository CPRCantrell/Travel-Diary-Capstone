import React, {useRef} from "react";
import "./Collapsible.scss"

const Collapsible = ({show,children,horizontal=false}) => {

    const collapsRef = useRef()

    return (
        <div
        className='collaps-control'
        ref={collapsRef}
        style={!horizontal ? {maxHeight: !show ? 0 : collapsRef.current.scrollHeight + 'px'} : {maxWidth: !show ? 0 : collapsRef.current.scrollWidth + 'px'}}>
            {children}
        </div>
    );
}

export default Collapsible;