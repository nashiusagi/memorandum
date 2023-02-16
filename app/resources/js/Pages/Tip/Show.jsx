import React from "react";

const Show = (props) => {
    return (
        <>
            <h1>Tips</h1>
            {props.tips.map((tip) => {
                return (
                    <div>
                        <h2 key={tip}>{tip.title}</h2>
                        <p key={tip}>{tip.body}</p>
                    </div>
                );
            })}
            <p>
                <a href="/tips/create">create tips</a>
            </p>
        </>
    );
};

export default Show;
