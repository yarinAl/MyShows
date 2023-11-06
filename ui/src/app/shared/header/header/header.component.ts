import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { RouterModule } from '@angular/router'
import { filter } from 'rxjs'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchText = new FormControl('asd')
  counter = 0
  ngOnInit(): void {
    this.searchText.valueChanges
      .pipe(filter((value) => !!value && value.length >= 2))
      .subscribe(() => {
        console.log('search now')
      })
  }
}
