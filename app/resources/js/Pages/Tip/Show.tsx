import React from "react";
import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.js";

const Show = (props: any) => {
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
                <div className="mx-8 mt-8">
                    <h1 className="text-4xl dark:text-white">Tips</h1>
                    {props.tips.map((tip) => {
                        return (
                            <div className="my-8 mx-4">
                                <h2
                                    className="text-2xl dark:text-white"
                                    key={tip}
                                >
                                    {tip.title}
                                </h2>
                                <div className="mx-4 my-4">
                                    <p key={tip} className="dark:text-white">
                                        {tip.body}
                                    </p>
                                    <p
                                        key={tip}
                                        className="text-gray-400 dark:text-white"
                                    >
                                        {tip.created_at}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                    <p>
                        <Link href="/tips/create" className="text-white">
                            create tips
                        </Link>
                    </p>
                </div>
            </AuthenticatedLayout>
        </div>
    );
};

export default Show;
