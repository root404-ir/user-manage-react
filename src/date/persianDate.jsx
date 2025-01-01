import axios from 'axios'
import React, { useEffect, useState } from 'react'
const PersianDate = () => {
    const [date, setDate] = useState(null)
    useEffect(() => {
        axios.get('https://api.keybit.ir/time/').then(res => {
            setDate(res.data)
        })

    }, [])
    return (
        <div>
            {date ? (
                <div id='jeded' className='date text_shdow d-flex justify-content-center gap-2'>
                    <span>تاریخ امروز : </span>
                    <span>{date.date?.full?.official?.iso?.fa}</span>
                </div>
            ) : (
                <div className='d-flex justify-content-center'>
                    <p>در حال بارگزاری...</p>
                </div>
            )}
        </div>
    )
}

export default PersianDate