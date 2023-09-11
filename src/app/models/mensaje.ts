export class Mensaje {
    constructor(
        public mensaje_id ?:number,
        public id_chat? : number,
        public id_participante?: number,    
        public mensaje? : string
    ){}
}
