import { Component } from '@angular/core';
import { Ppt, PptResponse, SlideRequest } from '../../services/ppt';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PptEditor } from '../ppt-editor/ppt-editor';
import { NgZone } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-ppt-generator',
  imports: [CommonModule, FormsModule, PptEditor],
  standalone: true, // 👈 mark this as standalone too
  templateUrl: './ppt-generator.html',
  styleUrl: './ppt-generator.css'
})
export class PptGenerator {
  request: SlideRequest = { title: '', slides: 5 };
  response: PptResponse | null = null;
  loading = false;
  slides: any[] = [];


  constructor(private pptService: Ppt, private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

  onSubmit() {
    this.loading = true;
    // this.slides = [
    //       {
    //           "title": "Java Programming Language"
    //       },
    //       {
    //           "title": "Introduction",
    //           "content": [
    //               {
    //                   "text": "**Platform Independence** is a key feature"
    //               },
    //               {
    //                   "text": "**Object-Oriented** programming paradigm",
    //                   "subpoints": [
    //                       "**Encapsulation**",
    //                       "**Inheritance**",
    //                       "**Polymorphism**"
    //                   ]
    //               },
    //               {
    //                   "text": "Robust **security** features"
    //               },
    //               {
    //                   "text": "**Multithreading** support for concurrent programming"
    //               },
    //               {
    //                   "text": "Large **community** and ecosystem"
    //               }
    //           ],
    //           "notes": "Java is a popular language for developing large-scale applications."
    //       },
    //       {
    //           "title": "Syntax and Basics",
    //           "content": [
    //               {
    //                   "text": "**Variables** and **data types**"
    //               },
    //               {
    //                   "text": "**Operators** for arithmetic and logical operations"
    //               },
    //               {
    //                   "text": "**Control structures** (if-else, loops)",
    //                   "subpoints": [
    //                       "**If-else statements**",
    //                       "**For loops**",
    //                       "**While loops**"
    //                   ]
    //               },
    //               {
    //                   "text": "**Methods** for code reuse"
    //               },
    //               {
    //                   "text": "**Arrays** and **collections** for data storage"
    //               }
    //           ],
    //           "code": "public class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println(\"Hello, World!\");\n  }\n}",
    //           "notes": "Java's syntax is similar to C++."
    //       },
    //       {
    //           "title": "Object-Oriented Programming",
    //           "content": [
    //               {
    //                   "text": "**Classes** and **objects**"
    //               },
    //               {
    //                   "text": "**Constructors** for object initialization"
    //               },
    //               {
    //                   "text": "**Inheritance** for code reuse"
    //               },
    //               {
    //                   "text": "**Polymorphism** for method overriding"
    //               },
    //               {
    //                   "text": "**Encapsulation** for data hiding"
    //               }
    //           ],
    //           "image_url": "https://example.com/java-oop-diagram.png",
    //           "notes": "OOP is a fundamental concept in Java programming."
    //       },
    //       {
    //           "title": "Java Ecosystem",
    //           "content": [
    //               {
    //                   "text": "**JDK** (Java Development Kit)"
    //               },
    //               {
    //                   "text": "**JRE** (Java Runtime Environment)"
    //               },
    //               {
    //                   "text": "**JVM** (Java Virtual Machine)"
    //               },
    //               {
    //                   "text": "**Libraries** and **frameworks** (e.g., Spring, Hibernate)"
    //               },
    //               {
    //                   "text": "**Tools** for development (e.g., Eclipse, IntelliJ IDEA)"
    //               }
    //           ],
    //           "notes": "The Java ecosystem includes a range of tools and technologies."
    //       }
    //   ]
    this.pptService.generatePptSlides(this.request).subscribe({
      next: (res) => {
        this.ngZone.run(() => { 
        this.response = res;
        // this.slides = (res as any).slides || []; // Assuming the response contains a 'slides' field
        this.slides = [...((res as any).slides || [])];
        console.log('Generated Slides:', this.slides);
        this.loading = false;
        console.log(this.loading);
        this.cdr.detectChanges();
        
        });
      },
      error: (err) => {
        console.error('Error:', err);
        this.loading = false;
      }
    });
  }

  download() {
    if (this.response) {
      this.pptService.downloadPpt(this.response.ppt_id, this.response.output_file);
    }
  }
}
