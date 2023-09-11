import { Mensaje } from "./mensaje";

export class Chat {
    constructor(
        public id_chat ?: number,       
        public id_user1 ? : number,
        public id_user2 ? : number,
        public estado ? : boolean,
        public photo ? : string,
        public name ? : string,
        public mensajes? : Mensaje[]
    ){
        

    }
}
