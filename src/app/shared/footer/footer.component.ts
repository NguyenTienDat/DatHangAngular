import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  footerItems = [
    {
      icon: 'pi pi-facebook',
      link: 'https://www.facebook.com/groups/381897359755516',
      tooltip: 'FB group: https://www.facebook.com/groups/381897359755516',
    },
    {
      icon: 'pi pi-globe',
      link: 'https://nguyentiendat.github.io/DatHangAngular',
      tooltip: 'Online: https://nguyentiendat.github.io/DatHangAngular',
    },
    {
      icon: 'pi pi-github',
      link: 'https://github.com/NguyenTienDat/DatHangAngular',
      tooltip: 'Source: https://github.com/NguyenTienDat/DatHangAngular',
    },
    {
      icon: 'pi pi-database',
      link: 'https://console.firebase.google.com/',
      tooltip:
        'Database (tiendatntd1995@gmail.com): https://console.firebase.google.com/',
    },
    {
      icon: 'pi pi-external-link',
      link: 'https://damiekids.000webhostapp.com/pages/admin-tmdt/admin-tmdt.html',
      tooltip:
        'Old version: https://damiekids.000webhostapp.com/pages/admin-tmdt/admin-tmdt.html',
    },
  ];
  constructor() {}

  ngOnInit() {}
}
