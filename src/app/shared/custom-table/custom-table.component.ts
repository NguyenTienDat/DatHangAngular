import { Component, Input, OnInit } from '@angular/core';

export interface HeadersTable {
  name: string;
  field?: string;
}

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
})
export class CustomTableComponent implements OnInit {
  @Input() dataTable = [];
  @Input() headers!: HeadersTable[];
  constructor() {}

  ngOnInit() {}
}
