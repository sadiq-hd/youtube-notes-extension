import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Note {
  time: number;
  text: string;
  category: string;
}

declare const chrome: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  notes: Note[] = [];
  noteText = '';
  noteCategory = 'general';
  videoTitle = 'Loading...';

  ngOnInit() {
    this.loadNotes();
    this.observeVideoTitle();
  }

  loadNotes() {
    const data = localStorage.getItem('yt-notes');
    if (data) this.notes = JSON.parse(data);
  }

  saveNotes() {
    localStorage.setItem('yt-notes', JSON.stringify(this.notes));
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
        category: this.noteCategory,
      });
      this.noteText = '';
      this.saveNotes();
    });
  }

  deleteNote(i: number) {
    this.notes.splice(i, 1);
    this.saveNotes();
  }

  goToTime(seconds: number) {
    const video = document.querySelector('video') as HTMLVideoElement;
    if (video) {
      video.currentTime = seconds;
      video.play();
    }
  }

  observeVideoTitle() {
    const updateTitle = () => {
      const el =
        document.querySelector('h1.title') ||
        document.querySelector('h1.ytd-watch-metadata') ||
        document.querySelector('h1.ytd-video-primary-info-renderer');

      const newTitle = el?.textContent?.trim() || '';
      if (newTitle && newTitle !== this.videoTitle) {
        this.videoTitle = newTitle;
      }
    };

    updateTitle();
    const observer = new MutationObserver(updateTitle);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  closePanel() {
    parent.postMessage({ action: 'closeYtNotes' }, '*');
  }
}
