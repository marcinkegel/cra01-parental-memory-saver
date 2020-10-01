import React, {useEffect, useState} from 'react';
import Carousel from "react-elastic-carousel";


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

    let displayedMemories = ()=>{

        let filtered = events.filter(event=>{
            let eventMonth = parseInt(event.date.split('.')[1]);
            let eventYear = parseInt(event.date.split('.')[2]);
            return ((eventMonth === (currentMonth + 1)) && ((currentYear-eventYear)>0))
        })
        let displayed = filtered.map(function(event){
            let eventYear = parseInt(event.date.split('.')[2]);
            let yearsAgo = currentYear-eventYear;

            return(

                <div key={event.id} className="memory--element">

                    <h4 className= "memory--element--header memory--element--text" > This month  {(yearsAgo===1)? 'last year' : (yearsAgo + ' years ago')}</h4>
                    <h4 className= "memory--element--text">{event.type}</h4>
                    <h2 className= "memory--element--text memory--element--title ">{event.title}</h2>

                    <p className= "memory--element--text memory--element--note">{event.note}</p>
                    {event.image && <img className="memory--element--img" alt="your memory" src={event.image}/>}

                </div>


            )

        },0)
        return displayed
    }

    return (


        <>
            <h3>Display Memory</h3>
            <div className="carousel--container">
                <Carousel>
                    {displayedMemories()}
                </Carousel>
            </div>

        </>
    );

}

export default DisplayMemory;
