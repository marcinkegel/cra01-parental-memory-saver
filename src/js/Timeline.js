import React, {useState, useEffect} from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import AddEntry from "./AddEntry";
import DisplayMemory from "./DisplayMemory";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteRight, faStar, faCommentDots, faHeart } from '@fortawesome/free-solid-svg-icons'



const selectIcon= (type)=>{
    const quoteIcon = <FontAwesomeIcon icon={faQuoteRight} />
    const milestoneIcon = <FontAwesomeIcon icon={faStar} />
    const commentIcon = <FontAwesomeIcon icon={faCommentDots} />
    const heartIcon = <FontAwesomeIcon icon={faHeart}/>

    if (type ==="milestone"){
        return milestoneIcon
    } else if (type === "quote") {
        return quoteIcon
    } else if (type === "comment"){
        return commentIcon
    } else {
        return heartIcon
    }
}

const Timeline = () => {


    const [events, setEvents] = useState([]);

    const API = "http://localhost:3001/events";

    useEffect(()=>{
        fetch(API)
            .then(response =>{
                if (response.ok){
                    return response.json();
                } else {
                    throw new Error("Błąd sieci!");
                }
            })
            .then(data=>{
                let sortedEvents = data.sort(function (a, b) {
                    a = a.date.toString().split('.');
                    b = b.date.toString().split('.');
                    return b[2] - a[2] || b[1] - a[1] || b[0] - a[0];
                });
                setEvents(sortedEvents);
                console.log("events loaded to state")
            })
            .catch(error =>{
                console.log(error)

            })
    },[]);






    const handleAddEntry = (event)=>{
        let eventsToSort = [event, ...events];
        let sortedEvents = eventsToSort.sort(function (a, b) {
            a = a.date.toString().split('.');
            b = b.date.toString().split('.');
            return b[2] - a[2] || b[1] - a[1] || b[0] - a[0];
        });
        return setEvents(sortedEvents)
    }



    return (
        <>
            <DisplayMemory events={events}/>
            <AddEntry handleAddEntry={handleAddEntry}/>
            <div style={{backgroundColor: "grey"}}>
                <h2 className="timeline--header">
                    Timeline
                 </h2>

                <VerticalTimeline className="vtl">

                    {events.map(function(event){
                            return(
                                <VerticalTimelineElement
                                    key={event.id}
                                    className="vertical-timeline-element--work"
                                    date={event.date}
                                    iconStyle={{ background: 'grey', color: '#fff', fontSize:"23px"}}
                                    icon={selectIcon(event.type)}
                                >
                                    <h3 className="timeline--text vertical-timeline-element-title">{event.title}</h3>
                                    <h4 className="timeline--text vertical-timeline-element-subtitle">{event.type}</h4>
                                    <p className="timeline--text timeline--note">{event.note}</p>
                                    {event.image && <div className="memory--element--img--container"> <img className="timeline--img" alt="your memory" src={event.image}/></div>}
                                </VerticalTimelineElement>
                            )


                        },0)
                    }
                </VerticalTimeline>
            </div>



        </>
    )

}

export default Timeline;