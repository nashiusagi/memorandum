import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@inertiajs/react";
//import ColorSchemeToggle from "../../Components/ColorSchemeToggle";
import ReactMarkdown from "react-markdown";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.js";

const previewStyle = {
    display: "flex",
    justifyContent: "space-between",
};

const Create = (props: any) => {
    const [values, setValues] = useState({
        title: "",
        body: "",
    });

    const [markedBody, setMarkedBody] = useState("");

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
        <div className="dark">
            <AuthenticatedLayout
                auth={props.auth}
                errors={props.errors}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Dashboard
                    </h2>
                }
            >
                <p className="text-white">タイトル</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="title"
                        name="tips[title]"
                        value={values.title}
                        onChange={handleChange}
                    />
                    <br />
                    <p className="text-white">本文：</p>
                    <div style={previewStyle}>
                        <div style={{ width: "50%", marginRight: 10 }}>
                            <textarea
                                id="body"
                                name="tips[body]"
                                value={values.body}
                                onChange={handleChange}
                            />
                        </div>
                        <div style={{ width: "50%", color: "#ffffff" }}>
                            <p>Preview</p>
                            <br />
                            <ReactMarkdown children={markedBody} />
                        </div>
                    </div>
                    <button type="submit">
                        <p className="text-white">Store</p>
                    </button>
                </form>
                <p>
                    <Link href="/tips">
                        <p className="text-white">back</p>
                    </Link>
                </p>
            </AuthenticatedLayout>
        </div>
    );
};

export default Create;
