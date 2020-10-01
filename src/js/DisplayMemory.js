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

                <div key={event.id} style={{
                    backgroundColor: "grey",
                    width: "400px",
                    height: "300px"
                }}

                >

                    <h2> This month  {(yearsAgo===1)? 'last year' : (yearsAgo + ' years ago')}</h2>
                    <h3 >{event.title}</h3>
                    <h4 >{event.type}</h4>
                    <p>{event.note}</p>

                </div>


            )

        },0)
        return displayed
    }

    return (


        <>
            <h3>Display Memory</h3>
            <Carousel>
                {displayedMemories()}
            </Carousel>
        </>
    );

}

export default DisplayMemory;
