import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/app/model/Comment.model';
import { Post } from 'src/app/model/Post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  commentForm: FormGroup;
  post: Post;
  id = this.route.snapshot.params['id'];

  constructor(private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute, private postService: PostsService) { }

  ngOnInit(): void {
    this.initform();
  }

  initform() {
    this.commentForm = this.formBuilder.group(
      {
        pseudo: ['', [Validators.required]],
        comment: ['', [Validators.required]]
      }
    );

    this.postService.getSinglePost(+this.id).then(
      (post: Post) => {
        this.post = post;
        //console.log('id: ' +this.post.idPost);
      }
    );

  }

  onSubmit() {
    const idPost = this.post.idPost;
    const pseudo = this.commentForm.get('pseudo').value;
    const comment = this.commentForm.get('comment').value;
    const commentDate = new Date().toString().split(' ');
    const month = commentDate[1];
    const day = commentDate[2];
    const year = commentDate[3];
    const date = month.concat(' ', day, ' ', year);
    const newComment = new Comment(idPost, pseudo, comment, date);
    this.postService.createNewComment(newComment);
    this.initform();
  }


}
