import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ModifyPostComponent } from './post-list/modify-post/modify-post.component';
import { PostFormComponent } from './post-list/post-form/post-form.component';
import { PostListComponent } from './post-list/post-list.component';
import { SinglePostComponent } from './post-list/single-post/single-post.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'posts', canActivate: [AuthGuardService], component: PostListComponent},
  {path: 'posts/view/:id', canActivate: [AuthGuardService], component: SinglePostComponent},
  {path: 'posts/new', canActivate: [AuthGuardService], component: PostFormComponent},
  {path: 'posts/modify/:id', canActivate: [AuthGuardService], component: ModifyPostComponent},
  {path: '', redirectTo: 'posts', pathMatch:'full'},
  {path: '**', redirectTo: 'posts'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
