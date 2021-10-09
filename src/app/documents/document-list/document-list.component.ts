import {
  Component,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';

import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document(
      1984,
      "CIT 260 - Object Oriented Programming",
      "In this course you will learn Object Oriented Programming and the Java programming language by designing and creating a simple game.",
      "https://content.byui.edu/file/22c0260d-e1b7-43a2-8903-8d8f948041ee/4/syllabus.html",
      null
    ),
    new Document(
      1432,
      "CS 313 - Web Engineering II",
      "This course builds upon Web Engineering I allowing students to create more advanced web applications and services. The emphasis of this course will be on server-side technologies and n-tier applications using relational database technology. Different server-side technologies will be used for creating dynamic n-tier web applications. Client side technologies will be enhanced and combined with server-side technologies to create rich; web applications.",
      "https://content.byui.edu/file/14882098-ce1f-44ba-a196-a7aebcb3d5ce/1/course/syllabus.html",
      null
    ),
    new Document(
      9721,
      "CIT 301B - Advanced CSS",
      "This class provides a deeper dive into topics in CSS. Topics of study will include: advanced CSS layout and positioning techniques, complex CSS selectors, CSS transitions and animations, CSS Preprocessing, an introduction to CSS libraries, and using svg with html and css.",
      "https://content.byui.edu/file/ba9e0cec-385b-4815-88c3-5edc2031ca9b/4/wdd331syllabus.html",
      null
    ),
    new Document(
      8411,
      "CS 124 - Intro to Software Development",
      "CS 124 is the first class in a two class sequence exploring how to write code in C++. The first class, CS 124, teaches us how to write procedural programs. The second class, CS 165, teaches us how to write object oriented programs. The goal of CS 124 is that each student will be able to solve problems in C++ and have a solid foundation in software development methodology.",
      "https://content.byui.edu/file/cddfb9c0-a825-4cfe-9858-28d5b4c218fe/1/Course/124.Syllabus-Online.html",
      null
    )
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
