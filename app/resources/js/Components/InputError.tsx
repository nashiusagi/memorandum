import React from "react";

interface Props {
    message: any;
    className: any;
}

export default function InputError({ message, className = "" }: Props) {
    return message ? (
        <p className={"text-sm text-red-600 " + className}>{message}</p>
    ) : null;
}
