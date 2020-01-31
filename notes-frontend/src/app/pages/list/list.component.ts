import { Component, OnInit } from '@angular/core';
import { Note } from '../../note';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  notes = [
    new Note('hej', 'lorem ipsum'),
    new Note('hej', 'lorem ipsum'),
    new Note('hej', 'lorem ipsum'),
    new Note('hej', 'lorem ipsum'),
    new Note('hej', 'lorem ipsum'),
    new Note('hej', 'lorem ipsum'),
    new Note('hej', 'lorem ipsum'),
    new Note('hej', 'lorem ipsum')
  ];
  constructor() {}

  ngOnInit() {}
}
