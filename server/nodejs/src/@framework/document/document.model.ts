import { NewDocument, RetrievedDocument } from 'documentdb';

export class Document implements NewDocument, RetrievedDocument {

    constructor(id?: string, ts?: number, self?: string) {

        this.id = id || '';
        this._ts = ts || 0;
        this._self = self || '';
    }

    public id: string;
    public _ts: number;
    public _self: string;
}
