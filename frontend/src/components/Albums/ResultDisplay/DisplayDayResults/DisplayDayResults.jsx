import { useNavigate } from 'react-router-dom';

import './DisplayDayResults.scss'

const DisplayDayResults = ({days}) => {

    const navigation = useNavigate()

    return (
        <div className='day-results'>
            <h1>---Days---</h1>
            <table>
                <thead>
                    <tr>
                        <th>Day on Trip</th>
                        <th>Country</th>
                        <th>State</th>
                        <th>City</th>
                        <th>Entry</th>
                    </tr>
                </thead>
                <tbody>
                    {days.map((day, index) => {
                        return(
                            <tr key={index} onClick={()=>navigation(`/day-detail/${day.album_id}`)}>
                                <td>{day.day_on_trip}</td>
                                <td>{day.country}</td>
                                <td>{day.state}</td>
                                <td>{day.city}</td>
                                <td>{day.entry}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default DisplayDayResults;