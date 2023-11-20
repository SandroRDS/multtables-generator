import { NUMBER_SEQUENCE_CACHE } from "../constants";

function addNewCacheSequence(multiplicand: number, newSequence: number[][]) {
    const numberSequenceCacheJSON = localStorage.getItem(NUMBER_SEQUENCE_CACHE) ?? '{}';
    const numberSequenceCache = JSON.parse(numberSequenceCacheJSON);
    const sequenceSelected = numberSequenceCache[multiplicand];

    numberSequenceCache[multiplicand] = [...(sequenceSelected || []) as number[][], ...newSequence];
    localStorage.setItem(NUMBER_SEQUENCE_CACHE, JSON.stringify(numberSequenceCache));
};

export default addNewCacheSequence;
