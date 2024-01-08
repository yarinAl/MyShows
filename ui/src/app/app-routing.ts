import { Route } from '@angular/router'
import { authGuard } from './auth.guard'
import { EpisodeComponent } from './pages/episode/episode.component'
import { HomeComponent } from './pages/home/home.component'
import { ProfileComponent } from './pages/profile/profile.component'
import { ShowComponent } from './pages/show/show.component'
import { EpisodeResolverService } from './resolvers/episode-resolver.service'
import { ShowResolverService } from './resolvers/show-resolver.service'
import { ShowsResolverService } from './resolvers/shows-resolver.service'

export const ROUTES: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      shows: ShowsResolverService,
    },
  },
  {
    path: 'show/:id',
    component: ShowComponent,
    resolve: {
      showResolverData: ShowResolverService,
    },
  },
  {
    path: 'show/:id/season/:seasonId',
    component: ShowComponent,
    resolve: {
      showResolverData: ShowResolverService,
    },
  },
  {
    path: 'episode/:id',
    component: EpisodeComponent,
    resolve: {
      episode: EpisodeResolverService,
    },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },

  // { path: 'home/show', component: ShowComponent },

  // {path: 'admin', loadComponent: () => import('./admin/panel.component').then(mod => mod.AdminPanelComponent)},
]
