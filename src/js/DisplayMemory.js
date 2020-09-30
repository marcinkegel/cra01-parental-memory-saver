import React, {useEffect, useState} from 'react';


const DisplayMemory = ({events}) => {
    const [currentMonth, setCurrentMonth] = useState();
    const [currentYear, setCurrentYear] = useState();
    // const [filteredEvents, setFilteredEvents] = useState();

    useEffect(()=>{
        setCurrentMonth(prevState => {
            let date = new Date();
            return date.getMonth()
        })
        setCurrentYear(prevState => {
            let date = new Date();
            return date.getFullYear()
        })
        // setFilteredEvents(prevState => {
        //
        // })
    },[])

    const displayNext = (e)=>{

        console.log(e)
    }
    const displayPrevious = (e)=>{
        e.target.parentElement.parentElement.className = 'hide'
        e.target.parentElement.parentElement.nextSibling.className = 'show'
    }






    return (


        <>

            <h3>Display Memory</h3>
            {events.map(function(event, index){
                let eventMonth = parseInt(event.date.split('.')[1]);
                let eventYear = parseInt(event.date.split('.')[2]);

                return(
                    ((eventMonth === (currentMonth + 1)) && ((currentYear-eventYear)>0)) &&
                        <div key={event.id}
                             // className={(index===0)? "display": "hide"}
                            >

                            <h2> This month  {((currentYear-eventYear)===1)? 'last year' : (currentYear-eventYear + ' years ago')}</h2>
                            <h3 >{event.title}</h3>
                            <h4 >{event.type}</h4>
                            <p>{event.note}</p>
                            <div>
                                <button onClick={e=>displayPrevious(e)}>previous</button>
                                <button onClick={e=>displayNext(e)}>next</button>
                            </div>
                        </div>


                )

            },0)
            }
        </>
    );

}

export default DisplayMemory;
