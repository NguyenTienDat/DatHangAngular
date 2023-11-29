import { Component, Input, OnInit } from '@angular/core';
import { renderLink } from '../utils';

export interface HeadersTable {
  name: string;
  field: string;
  type: 'string' | 'image' | 'number' | 'link';
  className?: string;
  headerClassName?: string;
  noFilter?: boolean;
}

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
})
export class CustomTableComponent implements OnInit {
  @Input() dataTable = [];
  @Input() headers!: HeadersTable[];
  renderLink = renderLink;
  constructor() {}

  ngOnInit() {}
}
