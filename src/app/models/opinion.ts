export class Opinion {
    constructor(
      public id_user?: number,
      public stars?: number,
      public comentario?: string,
      public id_opiniones?: number,
      public emisor?: number,
      public receptor?: number,
      public name?: string,
      public photo?: string,
      public puntuacion?: number,
      public respuestaTatuador?: string
    ) {}
  }
  