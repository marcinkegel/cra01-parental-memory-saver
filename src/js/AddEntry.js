import React, {useState} from 'react';

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

    const validate = () => {
        let valid = true;
        if (!form.title || form.title.length < 3 || typeof !form.title === 'string') {
            setError('Title should be at least 3 characters long.');
            return false;
        } else {
            setError(null);
        }
        if (!form.note || form.note.length < 10) {
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


                })
                .catch(error => {
                    console.log(error);
                    setIsSubmitted(false);
                    setSubmissionError(error)
                })
        }



    }


    return (
        <>
            <h2>Add Event</h2>

            {error &&
            <div>
                {error}
            </div>
            }



            <form className="form" onSubmit={handleSubmit}>
                <label className="form--element">Date (DD.MM.YYYY)
                    <input type="text" name="date" value={form.date} onChange={handleChange}/>
                </label>
                <label className="form--element">Title
                    <input type="text" name="title" value={form.title} onChange={handleChange}/>
                </label>
                <label className="form--element">Comment
                    <textarea name="note" value={form.note} onChange={handleChange}/>
                </label>
                <label className="form--element">Entry type
                    <select
                        value={form.type}
                        name="type"
                        onChange={handleChange}>
                        <option value="milestone">Milestone</option>
                        <option value="quote">Quote</option>
                        <option value="comment">Comment</option>
                    </select>
                </label>
                <button type="submit">Submit</button>


            </form>



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

        </>
    );

}

export default AddEntry;