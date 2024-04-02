import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {

    const [list, setList] = useState(() => {
        const data = window.localStorage.getItem(key);

        return data ? JSON.parse(data) : initialState;
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(list));
    }, [list, key]);


    return [list, setList];
}