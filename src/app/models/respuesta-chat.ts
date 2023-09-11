import { Chat } from "./chat";
import { Conversacion } from "./conversacion";

export class RespuestaChat {
    constructor(
        public error:boolean,
        public codigo: number,
        public mensaje: string,
        public data_conversacion : Chat[],
        public id_chat : number
    ){}
}
