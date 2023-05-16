import React, { useState } from "react";
import { createNewActivity } from "../api/fetch";

const ActivityForm = ({ token }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const submitHandler = async (e) => {
        try {
            e.preventDefault();
            const newAcivity = await createNewActivity(token, name, description)
            console.log("this is newActivity", newAcivity)
            const redirMyRoutines = () => {
                window.location.href = "/activities";
              };
            redirMyRoutines();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div >
            <form id="activity-form" onSubmit={submitHandler}>
                <div id="activity-form-inputs">
                    <h2> New Activity Form</h2>
                    <input
                        id="activity-form-name"
                        value={name}
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                    <input
                        id="activity-form-description"
                        value={description}
                        type="text"
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                    ></input>
                    <button id="activity-form-button" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default ActivityForm;