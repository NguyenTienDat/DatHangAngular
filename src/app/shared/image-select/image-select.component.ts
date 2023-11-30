import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NO_IMG, encodeImageFileAsURL } from '../utils';

@Component({
  selector: 'app-image-select',
  templateUrl: './image-select.component.html',
  styleUrls: ['./image-select.component.scss'],
})
export class ImageSelectComponent implements OnInit {
  @Output() imageOutput = new EventEmitter();
  IMG_DEFAULT = NO_IMG;

  constructor() {}

  ngOnInit() {}

  openSelectFile(inputImg: any, image: any) {
    inputImg.data = {
      image,
    };
    inputImg.click();
  }

  changeImg(fileElement: any, event: any) {
    console.log({ fileElement }, event);
    encodeImageFileAsURL(fileElement, (src: any) => {
      fileElement.data.image.src = src;
      this.imageOutput.emit(src);
    });
  }
}
