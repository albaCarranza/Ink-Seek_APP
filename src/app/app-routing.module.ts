
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PreRegisterComponent } from './pages/pre-register/pre-register.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileTatuadorExternaComponent } from './pages/profile-tatuador-externa/profile-tatuador-externa.component';
import { ProfileTatuadorPropiaComponent } from './pages/profile-tatuador-propia/profile-tatuador-propia.component';
import { EditProfileTatuadorComponent } from './pages/edit-profile-tatuador/edit-profile-tatuador.component';
import { EditProfileUserComponent } from './pages/edit-profile-user/edit-profile-user.component';
import { CalendarioComponent } from './pages/calendario/calendario.component';
import { AddEventoComponent } from './pages/add-evento/add-evento.component';
import { AddCitaComponent } from './pages/add-cita/add-cita.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { ConversacionChatComponent } from './pages/conversacion-chat/conversacion-chat.component';
import { DescubrirArtistaComponent } from './pages/descubrir-artista/descubrir-artista.component';
import { AddFotosComponent } from './pages/add-fotos/add-fotos.component';
import { GaleriaComponent } from './pages/galeria/galeria.component';
import { ConfirmarFotoComponent } from './pages/confirmar-foto/confirmar-foto.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { AddProductoComponent } from './pages/add-producto/add-producto.component';
import { OpinionesComponent } from './pages/opiniones/opiniones.component';
import { ModalAddOpinionComponent } from './pages/modal-add-opinion/modal-add-opinion.component';
import { ModalRespuestaComponent } from './pages/modal-respuesta/modal-respuesta.component';
import { TablonComponent } from './pages/tablon/tablon.component';
import { OnBoardingComponent } from './pages/on-boarding/on-boarding.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { RecomendacionesComponent } from './pages/recomendaciones/recomendaciones.component';
import { EstrellasComponent } from './pages/estrellas/estrellas.component';
import { ModificarCitaComponent } from './pages/modificar-cita/modificar-cita.component';
import { Opinion } from './models/opinion';
import { CamaraComponent } from './pages/camara/camara.component';
import { TiendaExternaComponent } from './pages/tienda-externa/tienda-externa.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent, data: { hideHeader: true, hideNavbar: true } },
  {path: 'register', component: RegisterComponent, pathMatch: 'full', data: { hideHeader: true, hideNavbar: true } },
  {path: 'pre-register', component: PreRegisterComponent, data: { hideHeader: true, hideNavbar: true } },
  {path: "on-boarding", component: OnBoardingComponent, data: { hideHeader: true, hideNavbar: true }},
  {path: 'home', component: HomeComponent },
  {path: "profile-tatuador-propia", component: ProfileTatuadorPropiaComponent},
  {path: "edit-profile-tatuador", component: EditProfileTatuadorComponent},
  {path: "edit-profile-user", component: EditProfileUserComponent},
  {path: "calendario", component: CalendarioComponent},
  {path: "add-evento", component: AddEventoComponent},
  {path: "add-cita", component: AddCitaComponent},
  {path: "chats", component: ChatsComponent},
  {path: "conversacion-chat", component: ConversacionChatComponent},
  {path: "descubrir-artista", component: DescubrirArtistaComponent},
  {path: "add-fotos", component: AddFotosComponent},
  {path: "galeria", component: GaleriaComponent},
  {path: "confirmar-foto", component: ConfirmarFotoComponent},
  {path: "tienda", component: TiendaComponent},
  {path: "add-producto", component: AddProductoComponent},
  {path: "opiniones", component: OpinionesComponent},
  {path: "add-opinion", component: ModalAddOpinionComponent},
  {path: "respuesta", component: ModalRespuestaComponent},
  {path: "tablon", component: TablonComponent},
  {path: "aboutUs", component: AboutUsComponent},
  {path: "recomendaciones", component: RecomendacionesComponent},
  {path: "estrellas", component: EstrellasComponent},
  {path: "modificar-cita/:id", component: ModificarCitaComponent},
  { path: 'profile-tatuador-externa', component: ProfileTatuadorExternaComponent },
  {path: "opinion", component: OpinionesComponent},
  {path: 'camara', component: CamaraComponent},
  {path: "tienda-externa", component: TiendaExternaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
