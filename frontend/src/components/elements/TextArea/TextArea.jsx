import React, { useState, useEffect } from 'react';
import axios from "axios";

import useGlobalVariables from '../../../hooks/useGlobalVariables';

const TextArea = ({row, name,  day}) => {

    const [entry, setEntry] = useState(day.entry);
    const [baseUrl, auth] = useGlobalVariables()

    useEffect(() => {
        updateEntry()
    }, [entry]);

    async function updateEntry(){
        try{
            let dayPackage = {entry:(entry === null? '':entry)}
            let response = await axios.put(baseUrl+'/day/'+day.id,dayPackage,auth)
            console.log(response.data)
        }
        catch{
            console.log('Issue updating entry')
        }
    }

    return <textarea rows={row} name={name} value={entry===null? '':entry} onInput={(e)=>setEntry(e.target.value)} />;
}

export default TextArea;