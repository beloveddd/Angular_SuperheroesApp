import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
