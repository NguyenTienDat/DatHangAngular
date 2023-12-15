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

  showToastWarning(detail: string, summary?: string) {
    this.messageService.add({
      severity: 'warn',
      summary: summary ?? 'Warning!',
      detail: detail,
    });
  }

  showInfo(detail: string, summary?: string) {
    this.messageService.add({
      severity: 'info',
      summary: summary ?? 'Info',
      detail,
    });
  }

  showError(detail: string, summary?: string) {
    this.messageService.add({
      severity: 'error',
      summary: summary ?? 'Error!',
      detail,
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
