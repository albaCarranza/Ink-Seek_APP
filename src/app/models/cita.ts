export class Cita {

    constructor(
        public id_cita? : number,
        public id_user? : number,
        public email?: string,
        public asunto?:string,
        public fecha? :string,
        public hora? : string,
        public name? : string,
        public last_name?: string,
    ){

    }
}