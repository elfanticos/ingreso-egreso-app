export class IngresoEgreso {
    desciption:string;
    monto:number;
    tipo:string;
    uid?:string;
    constructor(obj:DataObj) {
        this.desciption  = obj && obj.desciption  || null;
        this.monto       = obj && obj.monto       || null;
        this.tipo        = obj && obj.tipo        || null;
        this.uid         = obj && obj.uid         || null;
    }
}

interface DataObj {
    desciption:string;
    monto:number;
    tipo:string;
    uid?:string;
}