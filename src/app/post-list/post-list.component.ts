import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../model/Post.model';
import { Comment } from '../model/Comment.model';
import { AuthService } from '../services/auth.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  likeCount : number = 0;

  isAdmin: boolean;
  posts: Post[];
  comments: Comment[];
  postSubscription : Subscription;
  authAdminSubscription: Subscription;
  commentSubscription: Subscription;

  constructor(private postService: PostsService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.postSubscription = this.postService.postSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postService.getPosts();
    this.postService.emitPosts();
    

    this.authAdminSubscription = this.authService.isAdminSubject.subscribe(
      (admin: boolean) => {
        this.isAdmin = admin;
      }
    );
    this.authService.adminAuth();

    this.commentSubscription = this.postService.commentSubject.subscribe(
      (comments: Comment[]) => {
        this.comments = comments;
      }
    );
    this.postService.getComments();
    this.postService.emitComments();
  }

  onNewPost() {
    this.router.navigate(['/posts', 'new']);
  }

  onDeletePost(post: Post) {
    this.postService.removePost(post);
  }

  onviewPost(id: number) {
    this.router.navigate(['/posts', 'view', id]);
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
    this.authAdminSubscription.unsubscribe();
    this.commentSubscription.unsubscribe();
  }

  onLikePost(post: Post) {
    this.postService.saveLikes(post);
  }

  onDislikePost(post: Post) {
    this.postService.saveDislikes(post);
  }

}
