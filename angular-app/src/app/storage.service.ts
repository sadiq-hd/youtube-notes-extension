import { Injectable } from '@angular/core';

declare const chrome: any; // ✅ تعريف chrome

export interface NoteItem {
  id: string;
  text: string;
  time: number;     // seconds
  createdAt: number;
}

@Injectable({ providedIn: 'root' })
export class StorageService {
  private key(videoId: string) { return `yt_notes_${videoId}`; }

  async load(videoId: string): Promise<NoteItem[]> {
    return new Promise(resolve => {
      chrome.storage.local.get([this.key(videoId)], (data: any) => { // ✅ نوع data
        resolve((data[this.key(videoId)] as NoteItem[]) || []);
      });
    });
  }

  async save(videoId: string, notes: NoteItem[]) {
    return new Promise<void>(resolve => {
      chrome.storage.local.set({ [this.key(videoId)]: notes }, () => resolve());
    });
  }
}
