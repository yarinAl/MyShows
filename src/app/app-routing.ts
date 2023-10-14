import { Route } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { ShowComponent } from './pages/show/show.component'

export const ROUTES: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  { path: 'show/:id', component: ShowComponent },
  // { path: 'home/show', component: ShowComponent },

  // {path: 'admin', loadComponent: () => import('./admin/panel.component').then(mod => mod.AdminPanelComponent)},
]
