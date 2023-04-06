import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"

const Show = (props) => {
    return (
        <div class="dark">
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
        <div class="mx-8 mt-8">
            <h1 class="text-4xl dark:text-white">Tips</h1>
            {props.tips.map((tip) => {
                return (
                    <div class="my-8 mx-4">
                        <h2 class="text-2xl dark:text-white" key={tip}>{tip.title}</h2>
                    <div class="mx-4 my-4">
                        <p key={tip} class="dark:text-white">{tip.body}</p>
                        <p key={tip} class="text-gray-400 dark:text-white">{tip.created_at}</p>
                    </div>
                    </div>
                );
            })}
            <p>
                <a href="/tips/create">create tips</a>
            </p>
        </div>
        </AuthenticatedLayout>
        </div>
    );
};

export default Show;
