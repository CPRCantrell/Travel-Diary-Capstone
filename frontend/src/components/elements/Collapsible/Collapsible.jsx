import React, { useRef, useEffect, useState } from "react";
import "./Collapsible.scss"

const Collapsible = ({show,children,horizontal=false}) => {

    const collapsRef = useRef()
    const [scrollHeight, setScrollHeight] = useState(0)
    const [scrollWidth, setScrollWidth] = useState(0);

    useEffect(() => {
        setScrollHeight(collapsRef.current.scrollHeight)
        setScrollWidth(collapsRef.current.scrollWidth)
    }, []);

    return (
        <div
        className='collaps-control'
        ref={collapsRef}
        style={!horizontal ? {maxHeight: !show ? 0 : scrollHeight + 'px'} : {maxWidth: !show ? 0 : scrollWidth + 'px'}}>
            {children}
        </div>
    );
}

export default Collapsible;