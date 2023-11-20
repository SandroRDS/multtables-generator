import { useState, useEffect } from "react";

import searchCacheSequence from "../utils/searchCacheSequence";
import addNewCacheSequence from "../utils/addNewCacheSequence";

function useMultTable(multiplier: number = 0, finalNumber: number = 0) {
    const [multTableList, setMultTableList] = useState<Number[][]>([]);
    const list: Number[][] = [];

    useEffect(() => {
        if (finalNumber > 0) {
            const cacheSequence = searchCacheSequence(multiplier);
            const insertSequence = (start: number, end: number) => {
                const newSequence = [];
                for (let i = start; i <= end; i++) newSequence.push([multiplier, i, multiplier * i]);
                list.push(...newSequence);
                return newSequence;
            };

            if (cacheSequence) {
                if (cacheSequence.length >= finalNumber) list.push(...cacheSequence.slice(0, finalNumber));
                else {
                    list.push(...cacheSequence);
                    const sequenceCreated = insertSequence(cacheSequence.length, finalNumber);
                    addNewCacheSequence(multiplier, sequenceCreated);
                }
            } else {
                const sequenceCreated = insertSequence(1, finalNumber);
                addNewCacheSequence(multiplier, sequenceCreated);
            };

            setMultTableList([...list]);
        }
    }, [multiplier, finalNumber]);

    return multTableList;
}

export default useMultTable;
