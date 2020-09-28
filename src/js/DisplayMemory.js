import React, {useEffect, useState} from 'react';


const DisplayMemory = ({events}) => {
    const [currentMonth, setCurrentMonth] = useState();
    const [currentYear, setCurrentYear] = useState();

    useEffect(()=>{
        setCurrentMonth(prevState => {
            let date = new Date();
            return date.getMonth()
        })
        setCurrentYear(prevState => {
            let date = new Date();
            return date.getFullYear()
        })
    },[])



    console.log(currentYear)


    return (


        <>

            <h3>Display Memory</h3>
            {events.map(function(event){
                let eventMonth = parseInt(event.date.split('.')[1]);
                let eventYear = parseInt(event.date.split('.')[2]);
                console.log("eventMonth = "+eventMonth+"  current month = "+currentMonth+"  boolean= "+( eventMonth === (currentMonth + 1)))
                return(
                    ((eventMonth === (currentMonth + 1)) && ((currentYear-eventYear)>0)) &&
                        <div key={event.id}>

                            <h2> This month {currentYear-eventYear} year(s) ago</h2>

                            <h3 >{event.title}</h3>
                            <h4 >{event.type}</h4>
                            <p>{event.note}</p>
                        </div>


                )

            },0)
            }
        </>
    );

}

export default DisplayMemory;
