import addNewCacheSequence from '../../src/utils/addNewCacheSequence';
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

describe('Testando correto funcionamento do helper addNewCacheSequence.', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    test('A função busca corretamente o conteúdo da chave numberSequenceCache para reaproveitá-lo posteriormente.', () => {
        addNewCacheSequence(3, []);
        expect(localStorageGetMock).toHaveBeenCalledWith('numberSequenceCache');
    });

    test('A função cria uma nova chave para o multiplicador informado caso ele ainda não tenha tido nenhuma entrada.', () => {
        localStorageGetMock.mockReturnValue(JSON.stringify({}));
        addNewCacheSequence(3, [[3, 1, 3], [3, 2, 6]]);

        const localStorageData = {
            3: [[3, 1, 3], [3, 2, 6]],
        };

        expect(localStorageSetMock).toHaveBeenCalledWith('numberSequenceCache', JSON.stringify(localStorageData));
    });

    test('A função reaproveita os valores já existentes e apenas adiciona os novos cálculos caso o multiplicador informado já possua entradas.', () => {
        localStorageGetMock.mockReturnValue(JSON.stringify({
            3: [[3, 1, 3], [3, 2, 6]],
        }));
        addNewCacheSequence(3, [[3, 3, 9], [3, 4, 12], [3, 5, 15]]);

        const localStorageData = {
            3: [[3, 1, 3], [3, 2, 6], [3, 3, 9], [3, 4, 12], [3, 5, 15]],
        };

        expect(localStorageSetMock).toHaveBeenCalledWith('numberSequenceCache', JSON.stringify(localStorageData));
    });
});
