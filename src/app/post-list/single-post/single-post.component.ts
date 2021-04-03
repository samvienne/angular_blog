import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/model/Post.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  post: Post;
  isAdmin: boolean;
  authAdminSubscription: Subscription;
  id = this.route.snapshot.params['id'];

  constructor(private route:ActivatedRoute, private postService: PostsService, private router: Router, private authService: AuthService ) { }

  ngOnInit(): void {
    this.post = new Post('', '', 0);
    this.postService.getSinglePost(+this.id).then(
      (post: Post) => {
        this.post = post;
      }
    );

    this.authAdminSubscription = this.authService.isAdminSubject.subscribe(
      (admin: boolean) => {
        this.isAdmin = admin;
      }
    );
    this.authService.adminAuth();
  }

  onBack() {
    this.router.navigate(['/posts']);
  }

  modifyPost() {
    this.router.navigate(['/posts', 'modify', this.id]);
  }

}
