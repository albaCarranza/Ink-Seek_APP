
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.component.html',
  styleUrls: ['./on-boarding.component.css']
})
export class OnBoardingComponent implements OnInit{
  constructor(private router: Router) {}
  images= [
    {src:"assets/onboard/onboardhome/01.png", text:""},//0
    {src:"assets/onboard/onboardhome/presenta.png", text:""},//2
    {src:"assets/onboard/onboardhome/presenta.png", text:""},//4
    
    {src:"assets/onboard/onboardhome/Home onboard transicion blur.png", text:""},//6
    {src:"assets/onboard/onboardhome/profile-txt.png", text:""},//8
    {src:"assets/onboard/onboardhome/profile-txt.png", text:""},//10
    {src:"assets/onboard/onboardhome/perfil.png", text:""},//12
    
    {src:"assets/onboard/onboardhome/Home onboard transicion blur.png", text:""},//14
    {src:"assets/onboard/onboardhome/calendario-txt.png", text:""},//16
    {src:"assets/onboard/onboardhome/calendario-txt.png", text:""},//18
    {src:"assets/onboard/onboardhome/calendario.png", text:""},//20
    
    {src:"assets/onboard/onboardhome/Home onboard transicion blur.png", text:""},//22
    {src:"assets/onboard/onboardhome/descubre-txt.png", text:""},//24
    {src:"assets/onboard/onboardhome/descubre-txt.png", text:""},//26
    {src:"assets/onboard/onboardhome/descubrir.png", text:""},//28
    
    {src:"assets/onboard/onboardhome/Home onboard transicion blur.png", text:""},//30
    {src:"assets/onboard/onboardhome/publica-txt.png", text:""},//32
    {src:"assets/onboard/onboardhome/publica-txt.png", text:""},//34
    {src:"assets/onboard/onboardhome/subir foto.png", text:""},//36
    
    {src:"assets/onboard/onboardhome/Home onboard transicion blur.png", text:""},//38
    {src:"assets/onboard/onboardhome/eventos-txt.png", text:""},//40
    {src:"assets/onboard/onboardhome/eventos-txt.png", text:""},//42
    {src:"assets/onboard/onboardhome/eventos.png", text:""},//44
    
    {src:"assets/onboard/onboardhome/Home onboard transicion blur.png", text:""},//46
    {src:"assets/onboard/onboardhome/chat-txt.png", text:""},//48
    {src:"assets/onboard/onboardhome/chat-txt.png", text:""},//50
    {src:"assets/onboard/onboardhome/chat.png", text:""},//52
    
    {src:"assets/onboard/onboardhome/Home onboard transicion blur.png",text:""},//54
    {src:"assets/onboard/onboardhome/burger-txt.png", text:""},//56
    {src:"assets/onboard/onboardhome/burger-txt.png", text:""},//58
    {src:"assets/onboard/onboardhome/burger.png", text:""},//60

          // {src:"assets/onboard/calendario blur.png",text:""},//62
          // {src:"assets/onboard/añadir-citas-txt.png", text:""},//64
          // {src:"assets/onboard/añadir-citas-txt.png", text:""},//66
          // {src:"assets/onboard/añadir-citas-verde.png", text:""},//68

          // {src:"assets/onboard/calendario blur.png",text:""},//70
          // {src:"assets/onboard/calendario-txt.png", text:""},//72
          // {src:"assets/onboard/calendario-txt.png", text:""},//74
          // {src:"assets/onboard/calendario.png", text:""},//76

          // {src:"assets/onboard/calendario blur.png",text:""},//78
          // {src:"assets/onboard/consultar citas-txt.png", text:""},//80
          // {src:"assets/onboard/consultar citas-txt.png", text:""},//82
          // {src:"assets/onboard/consultar-citas.png", text:""},//84


    {src:"assets/onboardv2/editar_perfil/perfil_tatuador_blur.png", text:""},//0                 62                                  //86
    {src:"assets/onboardv2/editar_perfil/perfil_tatuador_blur.png", text:""},//2n                64                                  //88
    {src:"assets/onboardv2/editar_perfil/editar_perfil_final_blur.png", text:""},//4             66                                  //90
    {src:"assets/onboardv2/editar_perfil/editar_perfil_final_blur.png", text:""},//6             68                                 //92
    {src:"assets/onboardv2/editar_perfil/editar_perfil_final_noblur.png", text:""},//8           70                                 //94 //segundo 10//
    

    {src:"assets/onboardv2/editar_perfil/perfil_tatuador_blur.png", text:""},//10                72                                 //96
    {src:"assets/onboardv2/editar_tienda/editar_tienda_final_blur.png", text:""},//12            74                                 //98
    {src:"assets/onboardv2/editar_tienda/editar_tienda_final_blur.png", text:""},//14            76                                 //100
    {src:"assets/onboardv2/editar_tienda/editar_tienda_final_noblur.png", text:""},//16          78                                 //102//segundo 18//

    
    {src:"assets/onboardv2/editar_perfil/perfil_tatuador_blur.png", text:""},//18                80                                 //104
    {src:"assets/onboardv2/editar_valoracion/valoracion_blur.png", text:""},//20                 82                                 //106
    {src:"assets/onboardv2/editar_valoracion/valoracion_blur.png", text:""},//22                 84                                 //108
    {src:"assets/onboardv2/editar_valoracion/valoracion_noblur.png", text:""},//24               86                                 //110 //segundo 26//
    

    {src:"assets/onboardv2/editar_perfil/perfil_tatuador_blur.png", text:""},//26                88                                 //112
    {src:"assets/onboardv2/editar_galeria/galeria_blur.png", text:""},//28                       90                                 //114
    {src:"assets/onboardv2/editar_galeria/galeria_blur.png", text:""},//30                       92                                 //116
    {src:"assets/onboardv2/editar_galeria/galeria_noblur.png", text:""},//32                     94                                 //118//segundo 34//


    {src:"assets/onboardv2/mod_perfil/mod_perfil_iniblur.png", text:""},//34                     96                                //120
    {src:"assets/onboardv2/mod_perfil/mod_perfil_iniblur.png", text:""},//36                     98                                 //122
    {src:"assets/onboardv2/mod_perfil/mod_perfil_blur.png", text:""},//38                        100                                 //124
    {src:"assets/onboardv2/mod_perfil/mod_perfil_blur.png", text:""},//40                        102                                 //126
    {src:"assets/onboardv2/mod_perfil/mod_perfil_noblur.png", text:""},//42                      104                                 //128//segundo 44//


    {src:"assets/onboardv2/mod_perfil/mod_perfil_iniblur.png", text:""},//44                      106                                //130
    {src:"assets/onboardv2/mod_perfil_dato/editar perfil tatuador2_blur.png", text:""},//46       108                                //132
    {src:"assets/onboardv2/mod_perfil_dato/editar perfil tatuador2_blur.png", text:""},//48       110                               //134
    {src:"assets/onboardv2/mod_perfil_dato/editar perfil tatuador2_noblur.png", text:""},//50     112                               //136//segundo 52//





        // {src:"assets/onboardv2/chat/chat_main_blur.png", text:""},//52 //138
        // {src:"assets/onboardv2/chat/chat_noblur.png", text:""},//54 //140
        // {src:"assets/onboardv2/chat/chat_bocadillo.png", text:""},//56 //142
        // {src:"assets/onboardv2/chat/chat_bocadillo.png", text:""},//58 //144                                                      //segundo 60//


        // {src:"assets/onboardv2/artistas/artistas_blur.png", text:""},//62 //146
        // {src:"assets/onboardv2/artistas/artistas_blur.png", text:""},//64 //148
        // {src:"assets/onboardv2/artistas/artistas_noblur.png", text:""},//66 //150 
        // {src:"assets/onboardv2/artistas/artistas_noblur.png", text:""},//68 //152                                                      //segundo 68//
    {src:"assets/onboard/onboardhome/01.png", text:""},
    {src:"assets/onboard/onboardhome/01.png", text:""},
    {src:"assets/onboard/onboardhome/01.png", text:""},
  ]; 
  currentIndex= 0
  stopPresentation = false;
  next() {
    if (!this.stopPresentation) {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.stop();
    }
  }

  stop() {
    const lastImageIndex = this.images.length - 1;
    if (this.currentIndex === lastImageIndex) {
      this.stopPresentation = true;
      this.router.navigateByUrl("/home")
    }
  }


  ngOnInit() {
    setInterval(() => {
      this.next();
    }, 2000); 
  }
}

