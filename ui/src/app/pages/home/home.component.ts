import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { Show } from 'src/app/interfaces/show.interface'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  shows: Show[] | null = null
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shows }) => {
      this.shows = shows
    })
  }
}
