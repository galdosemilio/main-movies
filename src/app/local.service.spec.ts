import { TestBed } from '@angular/core/testing';

import { LocalService } from './local.service';

describe('LocalService', () => {
    let service: LocalService;
    let storageKey = "watchlist";

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LocalService);
        localStorage.clear();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should add new entry', () => {
        let spy = spyOn(localStorage, 'setItem').and.callThrough();
        let movieToAdd = "2d5b306e-1d33-465a-b40c-27003db9f06e";
        service.saveData(storageKey, movieToAdd);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(storageKey, JSON.stringify([movieToAdd]));
    });

    it('should get stored data', () => {
        let movieToAdd = "2d5b306e-1d33-465a-b40c-27003db9f06e";
        service.saveData(storageKey, movieToAdd);

        let storedData = service.getData(storageKey);
        expect(storedData.length).toBe(1);
        expect(storedData[0]).toBe(movieToAdd);
    });

    it('should remove a value from the stored data', () => {
        let spy = spyOn(localStorage, 'setItem').and.callThrough();
        let movieToAdd = "2d5b306e-1d33-465a-b40c-27003db9f06e";
        service.saveData(storageKey, movieToAdd);
        service.removeValue(storageKey, movieToAdd);

        expect(JSON.parse(localStorage[storageKey])).toEqual([]);
        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenCalledWith(storageKey, JSON.stringify([]));
    });
});
