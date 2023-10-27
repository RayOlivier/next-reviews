import { ReactNode } from "react";

interface HeadingProps {
	children: ReactNode;
}


export default function Heading({children}: HeadingProps){
    return (
        <h1 className={`font-bold font-orbitron text-2xl pb-3`}>{children}</h1>
    )
}