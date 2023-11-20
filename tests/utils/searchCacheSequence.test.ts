import searchCacheSequence from '../../src/utils/searchCacheSequence';
import { vi } from 'vitest';

import '@testing-library/jest-dom';

const localStorageGetMock = vi.fn();
const localStorageSetMock = vi.fn();

globalThis.localStorage = {
    getItem: localStorageGetMock,
    setItem: localStorageSetMock,
    clear: () => null,
    key: () => null,
    removeItem: () => null,
    length: 0,
};

describe('Testando correto funcionalidade do helper searchCacheSequence.', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    test('A função faz chamada corretamente ao método getItem do localStorage, solicitando o conteúdo da chave numberSequenceCache.', () => {
        searchCacheSequence(5);
        expect(localStorageGetMock).toHaveBeenCalledWith('numberSequenceCache');
    });

    test('A função faz chamada ao método setItem do localStorage caso a chave numberSequenceCache não exista, criando ela, e retorna null.', () => {
        expect(searchCacheSequence(5)).toBeNull();
        expect(localStorageSetMock).toHaveBeenCalledWith('numberSequenceCache', '{}');
    });

    test('A função não faz chamada ao método setItem caso a chave numberSequenceCache exista.', () => {
        localStorageGetMock.mockImplementation((key: string) => ({
            numberSequenceCache: '{}',
        })[key]);

        searchCacheSequence(5);
        expect(localStorageSetMock).not.toHaveBeenCalled();
    });

    test('A função retorna null caso o valor solicitado ainda não tenha apresentado nenhuma entrada e, caso haja entradas salvas, retorna a lista de cálculos que está salva.', () => {
        const numberSequenceCache = {
            3: [[3, 1, 3], [3, 2, 6], [3, 3, 9], [3, 4, 12]],
            5: [[5, 1, 5], [5, 2, 10], [5, 3, 15]],
        };

        localStorageGetMock.mockImplementation((key: string) => ({ numberSequenceCache: JSON.stringify(numberSequenceCache) })[key]);

        expect(searchCacheSequence(2)).toBeNull();
        expect(searchCacheSequence(3)).toEqual(numberSequenceCache[3]);
        expect(searchCacheSequence(5)).toEqual(numberSequenceCache[5]);
    });
});