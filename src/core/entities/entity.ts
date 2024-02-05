import { randomUUID } from 'crypto'

export class Entity {
    private _id: string

    get id() {
       return this._id
    }

    constructor(props: any, id?: string) {
        this._id = id ?? randomUUID()
    }
}