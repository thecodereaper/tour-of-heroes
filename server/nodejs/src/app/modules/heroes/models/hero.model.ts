import { Document } from '@framework/document';

export class Hero extends Document {

    constructor(id?: string, name?: string, ts?: number, self?: string) {

        super(id, ts, self);
        this.name = name || '';
    }

    public name: string;
}
