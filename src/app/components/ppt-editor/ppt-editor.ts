import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ppt } from '../../services/ppt';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-ppt-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './ppt-editor.html',
  styleUrl: './ppt-editor.css'
})
export class PptEditor {
  @Input() slides: any[] = [];
  currentIndex: number = 0;  
  renderSlides: any[] = [];

  constructor(private pptService: Ppt) {}

  ngOnChanges() {
    this.buildRenderSlides();
  }

  buildRenderSlides() {
    this.renderSlides = [];

    this.slides.forEach(slide => {
      this.renderSlides.push(slide); // original slide

      if (slide.code) {
        this.renderSlides.push({
          isCode: true,
          code: slide.code
        });
      }
    });
  }


  nextSlide() {
    if (this.currentIndex < this.renderSlides.length - 1) {
      this.currentIndex++;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  addSubpoints(slideIndex: number, bulletIndex: number) {
    this.slides[slideIndex].content[bulletIndex].subpoints = [''];
  }

  save() {
    this.pptService.generatePpt(this.slides).subscribe({
      next: (response) => {
        console.log('PPT generated successfully:', response);
        // alert('PPT generated successfully! You can now download it.');
        if (response) {
          this.pptService.downloadPpt(response.ppt_id, response.output_file);
        }
      },
      error: (error) => {
        console.error('Error generating PPT:', error);
        alert('Failed to generate PPT. Please try again.');
      }
    });
    // 👉 Here you would call a service method to POST updated JSON back to FastAPI
  }

  // Add a new empty slide after current index
  addSlide() {
    const newSlide = {
      title: 'New Slide',
      content: [{ text: '' }],
      notes: ''
    };
    this.slides.splice(this.currentIndex + 1, 0, newSlide);
    this.buildRenderSlides();
    this.currentIndex++;
  }

  // Remove the current slide (skip code slides)
  removeSlide() {
    const slideIndex = this.getOriginalSlideIndex(this.currentIndex);
    if (slideIndex !== -1) {
      this.slides.splice(slideIndex, 1);
      this.buildRenderSlides();
      if (this.currentIndex > 0) this.currentIndex--;
    }
  }

  addBullet(slideIndex: number) {
    if (!this.slides[slideIndex].content) this.slides[slideIndex].content = [];
    this.slides[slideIndex].content.push({ text: '' });
    this.buildRenderSlides();
  }

  // Map render index → original slide index
  getOriginalSlideIndex(renderIndex: number): number {
    let count = -1;
    for (let i = 0; i < this.slides.length; i++) {
      count++;
      if (count === renderIndex) return i;
      if (this.slides[i].code) count++; // skip code slide in render
    }
    return -1;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.slides, event.previousIndex, event.currentIndex);
    this.buildRenderSlides();
    this.currentIndex = event.currentIndex;
  }

}
