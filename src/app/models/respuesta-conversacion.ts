import { Mensaje } from "./mensaje";


export class RespuestaConversacion {
    constructor(
        public error:boolean,
        public codigo: number,
        public mensaje: string,
        public data_mensaje : Mensaje []){}
}
