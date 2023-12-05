import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastServiceService {
  constructor(private messageService: MessageService) {}

  showToastSuccess(detail: string, summary?: string) {
    this.messageService.add({
      severity: 'success',
      summary: summary ?? 'Successfully!',
      detail: detail,
    });
  }

  add(message: Message) {
    this.messageService.add(message);
  }

  addAll(messages: Message[]) {
    this.messageService.addAll(messages);
  }

  clear(key?: string) {
    this.messageService.clear(key);
  }
}
