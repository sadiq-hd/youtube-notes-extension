import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Note {
  time: number;
  text: string;
}

declare const chrome: any;

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [FormsModule, CommonModule]
})
export class AppComponent {
  notes: Note[] = [];
  noteText: string = '';

  constructor() {
    this.loadNotes();
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  addNote() {
  if (!this.noteText.trim()) return;

  chrome.runtime.sendMessage({ action: 'getTime' }, (response: any) => {
    const currentTime = response?.time || 0;

    this.notes.push({
      time: currentTime,
      text: this.noteText,
    });

    this.noteText = '';
    this.saveNotes();
  });
}


  deleteNote(i: number) {
    this.notes.splice(i, 1);
    this.saveNotes();
  }

  saveNotes() {
    localStorage.setItem('yt-notes', JSON.stringify(this.notes));
  }

  loadNotes() {
    const data = localStorage.getItem('yt-notes');
    if (data) this.notes = JSON.parse(data);
  }

  // ✅ هذه تعوض استخدام window في الـ template
  goToTime(seconds: number) {
    const video = document.querySelector('video') as HTMLVideoElement;
    if (video) {
      video.currentTime = seconds;
      video.play();
    }
  }
}
