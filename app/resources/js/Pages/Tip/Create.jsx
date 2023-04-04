import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@inertiajs/react";
//import ColorSchemeToggle from "../../Components/ColorSchemeToggle";
import ReactMarkdown from "react-markdown";

const previewStyle = {
    display: "flex",
    justifyContent: "space-between",
};

const Create = () => {
    const [values, setValues] = useState({
        title: "",
        body: "",
    });

    const [markedBody, setMarkedBody] = useState("");

    const handleChange = async (e) => {
        const key = e.target.id;
        const value = e.target.value;

        setValues((values) => ({
            ...values,
            [key]: value,
        }));

        await axios
            .post(route("tips.markdown"), values)
            .then((response) => {
                console.log(response.data);

                setMarkedBody(response.data);
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
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        // 入力欄にカーソルを合わせたときに、何も入力されていない状態でサーバに渡されるのを防ぐ
        if (values.body.trim().length != 0) {
            // 入力し終わってから2秒後に自動保存
            const timer = setTimeout(async () => {
                await axios
                    .post(route("tips.markdown"), values)
                    .then((response) => {
                        window.alert("保存しました");
                        console.log(response.data);

                        setMarkedBody(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }, 2000);

            return () => clearTimeout(timer);
        }
    });

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
                    <div style={{ width: "50%", marginRight: 10 }}>
                        <textarea
                            id="body"
                            name="tips[body]"
                            value={values.body}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ width: "50%" }}>
                        Preview
                        <br />
                        <ReactMarkdown children={markedBody} />
                    </div>
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
