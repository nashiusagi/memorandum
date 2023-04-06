import React from "react";

interface Props {
    forInput: any;
    value: any;
    className: any;
    children: any;
}

export default function InputLabel({
    forInput,
    value,
    className,
    children,
}: Props) {
    return (
        <label
            htmlFor={forInput}
            className={`block font-medium text-sm text-gray-700 ` + className}
        >
            {value ? value : children}
        </label>
    );
}
