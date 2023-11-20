import { NUMBER_SEQUENCE_CACHE } from "../constants";

function searchCacheSequence(multiplier: number): number[][] | null {
    let numberSequenceCacheJSON = localStorage.getItem(NUMBER_SEQUENCE_CACHE);

    if (!numberSequenceCacheJSON) {
        localStorage.setItem(NUMBER_SEQUENCE_CACHE, '{}');
        return null;
    };

    const numberSequenceCache = JSON.parse(numberSequenceCacheJSON);
    const numberSequenceSearched = numberSequenceCache[multiplier] ?? null;
    return numberSequenceSearched;
}

export default searchCacheSequence;
