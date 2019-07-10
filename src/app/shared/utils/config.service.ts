import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

    _apiUri: string;

    constructor() {
        this._apiUri = 'http://localhost:5050/api';
    }

    getApiUri() {
        return this._apiUri;
    }
}
