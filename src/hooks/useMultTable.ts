import { useState, useEffect } from "react";

function useMultTable(multiplier: number = 0, finalNumber: number = 0) {
    const [multTableList, setMultTableList] = useState<Number[][]>([]);
    const list: Number[][] = [];

    useEffect(() => {
        for(let i = 1; i <= finalNumber; i++) list.push([multiplier, i, multiplier * i]);

        if (list.length) setMultTableList([...list]);
    }, [multiplier, finalNumber]);

    return multTableList;
}

export default useMultTable;
