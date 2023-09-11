export class Evento {
    constructor(
        public id_evento:number,
        public photo:string,
        public title:string,
        public fecha_inicio: Date ,
        public fecha_final:Date ,
        public place:string ,
        public id_user:number
    ){}
}
