import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleDoubleDown, faAngleDoubleUp} from '@fortawesome/free-solid-svg-icons'

const AddEntry = ({handleAddEntry}) => {
    const [form, setForm] = useState({
        type: "",
        title: "",
        note: "",
        image: "",
        date: ""
    });
    const [error, setError] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submissionError, setSubmissionError] = useState(null);
    const [formDisplayed, setFormDisplayed] = useState(false);


    const API = "http://localhost:3001/events";

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    };

    const validateDate = () => {

        if (!form.date
            || form.date.length !== 10
            || typeof !form.title === 'string'
            || form.date.charAt(2)!=="."
            || form.date.charAt(5)!=="."
            || isNaN(form.date.substr(0,2)+form.date.substr(3,2)+form.date.substr(6,4))
            || parseInt(form.date.substr(0,2))  > 31
            || parseInt(form.date.substr(3,2))  > 12 ) {
            return false;
        } else {
            return true;
        }
    }

    const validate = () => {
        let valid = true;
        if (!validateDate()) {
            setError('Date should be entered in the following format: DD.MM.YYYY e.g. 31.09.2020');
            return false;
        } else {
            setError(null);
        }
        if (!form.title || form.title.length < 3 || typeof !form.title === 'string') {
            setError('Title should be at least 3 characters long.');
            return false;
        } else {
            setError(null);
        }
        if (!form.note || form.note.length < 14) {
            setError('Comment should be at least 15 characters long');
            return false;
        } else {
            setError(null);
        }
        if (!form.type) {
            setError('Please select type of entry');
            return false;
        } else {
            setError(null);
        }
        return valid;
    }

    const resetForm = ()=>{
        setForm({
            type: "",
            title: "",
            note: "",
            image: "",
            date: ""
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        if (validate()){

            fetch(API, {
                method: "POST",
                body: JSON.stringify(form),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setIsSubmitted(true);
                    handleAddEntry(data)
                    resetForm()

                })
                .catch(error => {
                    console.log(error);
                    setIsSubmitted(false);
                    setSubmissionError(error)
                })
        }



    }

    const openAddEvent = ()=>{
        setFormDisplayed(!formDisplayed);
    }
    const selectIcon = ()=>{
        if (formDisplayed) {
            return faAngleDoubleUp
        } else {
            return faAngleDoubleDown
        }
    }



    return (
        <>
            <button className="addEntry--button" onClick={e=>openAddEvent()}> <FontAwesomeIcon className="addEntry--icon" icon={selectIcon()}/> Add Event  <FontAwesomeIcon className="addEntry--icon" icon={selectIcon()}/></button>

            { formDisplayed && <form className="form" onSubmit={handleSubmit}>
                <label className="form--element">Date (DD.MM.YYYY)
                    <input className="form--input" type="text" name="date" value={form.date} onChange={handleChange}/>
                </label>
                <label className="form--element">Title
                    <input className="form--input" type="text" name="title" value={form.title} onChange={handleChange}/>
                </label>
                <label className="form--element">Comment
                    <textarea className="form--input" name="note" value={form.note} onChange={handleChange}/>
                </label>
                <label className="form--element">Entry type
                    <select className="form--input"
                        value={form.type}
                        name="type"
                        onChange={handleChange}>
                        <option value=""></option>
                        <option value="milestone">Milestone</option>
                        <option value="quote">Quote</option>
                        <option value="comment">Comment</option>
                    </select>
                </label>

                <label className="form--element"> Image URL (optional)
                    <input className="form--input" type="url" name="image" value={form.image} onChange={handleChange}/>
                </label>
                <button className="form--btn" type="submit">Submit</button>

                {error &&
                <div>
                    {error}
                </div>
                }
                {submissionError &&
                <div>
                    Submission Error -  {submissionError}
                </div>
                }

                {isSubmitted &&
                <div>
                    Operation completed!
                </div>
                }
            </form>}

        </>
    );

}

export default AddEntry;