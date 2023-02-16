import { React, useState } from "react";
import axios from "axios";
import { Link } from "@inertiajs/react";

const previewStyle = {
    display: "flex",
    width: "100vw",
    height: "40vh",
};

const Create = () => {
    const [values, setValues] = useState({
        title: "",
        body: "",
    });

    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;

        setValues((values) => ({
            ...values,
            [key]: value,
        }));

        axios
            .post(route("tips.markdown"), values)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        axios
            .post(route("tips.store"), values)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            タイトル：
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="title"
                    name="tips[title]"
                    value={values.title}
                    onChange={handleChange}
                />
                <br />
                本文：
                <div style={previewStyle}>
                    <div>
                        <textarea
                            id="body"
                            name="tips[body]"
                            value={values.body}
                            onChange={handleChange}
                        />
                    </div>
                    <div>preview here</div>
                </div>
                <button type="submit">Store</button>
            </form>
            <p>
                <Link href="/tips">back</Link>
            </p>
        </>
    );
};

export default Create;
