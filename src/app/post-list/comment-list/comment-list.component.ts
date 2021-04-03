import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/model/Comment.model';
import { Post } from 'src/app/model/Post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit, OnDestroy {

  comments: Comment[];
  commentSubscription: Subscription;
  id = this.route.snapshot.params['id'];

  @Input() idArticle: number;

  constructor(private postService: PostsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.commentSubscription = this.postService.commentSubject.subscribe(
      (comments: Comment[]) => {
        this.comments = comments;
      }
    );
    this.postService.getComments();
    this.postService.emitComments();
  }

  ngOnDestroy() {
    this.commentSubscription.unsubscribe();
  }
    
}
