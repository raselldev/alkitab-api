/**
 * The useModal function is a custom hook that manages the state of a modal component in a TypeScript
 * React application.
 * @returns The `useModal` custom hook is returning an object with two properties: `isOpen` and
 * `toggle`.
 */
import { useState } from "react";

export default function useModal() {
    const [isOpen, setisOpen] = useState(false);

    const toggle = () => {
        setisOpen(!isOpen);
    };

    return {
        isOpen,
        toggle
    };
}
