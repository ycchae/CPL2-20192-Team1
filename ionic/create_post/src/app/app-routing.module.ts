import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// or loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'generate-task', loadChildren: './generate-task/generate-task.module#GenerateTaskPageModule' },
  { path: 'main', loadChildren: './main/main.module#MainPageModule' },
  { path: 'task-list', loadChildren: './task-list/task-list.module#TaskListPageModule' },
  { path: 'generate-project', loadChildren: './generate-project/generate-project.module#GenerateProjectPageModule' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
