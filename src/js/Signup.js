import React, {useState} from 'react';
import {useAuth} from "./contexts/AuthContext";


const Signup = () => {

    const [form, setForm] = useState({
        username: '',
        email: '',
        passwordOne: '',
        passwordTwo: '',
        error: null,
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    };

    const {signup} = useAuth();

    const onSubmit = event => {
        event.preventDefault();
        signup(form.email, form.passwordOne);
    }


    const isInvalid =
        form.passwordOne !== form.passwordTwo ||
        form.passwordOne === '' ||
        form.email === '' ||
        form.username === '';




    return (
        <div>
            <h1>SignUp</h1>

            <form onSubmit={onSubmit}>
                <input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    type="text"
                    placeholder="Full Name"
                />
                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="passwordOne"
                    value={form.passwordOne}
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                />
                <input
                    name="passwordTwo"
                    value={form.passwordTwo}
                    onChange={handleChange}
                    type="password"
                    placeholder="Confirm Password"
                />
                <button disabled={isInvalid} type="submit">
                    Sign Up</button>

                {/*{error && <p>{error.message}</p>}*/}
            </form>


            <h3>Already have an account? Log In </h3>
        </div>
    );

}

export default Signup;