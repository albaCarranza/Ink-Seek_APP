import { Component, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/models/user';
import { CamaraService } from 'src/app/shared/camara.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.css']
})
export class CamaraComponent {
  public usuario: User;
  public id_user: number;
  public is_Tatuador: boolean;
  public isConfirmationModalOpen: boolean = false;
  public selectedPhoto: string = '';

  @ViewChild('videoElement') videoElement!: ElementRef;

  constructor(public userService: UserService, public camaraService: CamaraService) {
    this.usuario = this.userService.user;
    this.is_Tatuador = this.userService.is_Tatuador;
    this.id_user = this.userService.user.id_user;
    console.log(this.usuario);
  }

  ngAfterViewInit() {
    this.startCamera();
  }

  startCamera() {
    const video = this.videoElement.nativeElement;

    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error al acceder a la cámara: ', error);
      });
  }

  capture() {
    const video = this.videoElement.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);

    const photoURL = canvas.toDataURL('image/png');

    this.openConfirmationModal(photoURL);
  }

  openConfirmationModal(photoURL: string) {
    this.selectedPhoto = photoURL;
    this.isConfirmationModalOpen = true;
  }

  closeConfirmationModal() {
    this.selectedPhoto = '';
    this.isConfirmationModalOpen = false;
  }

  uploadSelectedPhoto() {
    const formData = new FormData();
    formData.append('photo', this.dataURItoBlob(this.selectedPhoto));

    this.camaraService.uploadImage(formData)
      .subscribe(
        (response) => {
          console.log(response);
          this.closeConfirmationModal();
        },
        (error) => {
          console.error('Error al subir la foto: ', error);
          this.closeConfirmationModal();
        }
      );
  }

  dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const photoURL = e.target.result;
        this.openConfirmationModal(photoURL);
      };
      reader.readAsDataURL(file);
    }
  }
}
