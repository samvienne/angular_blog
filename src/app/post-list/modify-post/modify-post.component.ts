import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/Post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-modify-post',
  templateUrl: './modify-post.component.html',
  styleUrls: ['./modify-post.component.scss']
})
export class ModifyPostComponent implements OnInit {

  post: Post;
  ModifyPostForm :FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  id = this.route.snapshot.params['id'];

  constructor(private route:ActivatedRoute, private router: Router, private postService: PostsService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initform();
  }

  initform() {
    this.ModifyPostForm = this.formBuilder.group(
      {
        title: ['' , Validators.required],
        description: ['', Validators.required]
      }
    );

    this.postService.getSinglePost(+this.id).then(
      (post: Post) => {
        this.post = post;
      }
    ).then(
      () => {
        this.ModifyPostForm = this.formBuilder.group(
          {
            title: [this.post.title , Validators.required],
            description: [this.post.description, Validators.required]
          }
        );
      }
    );
  }

  onModify(post: Post) {
    const title = this.ModifyPostForm.get('title').value;
    const description = this.ModifyPostForm.get('description').value;
    if(this.fileUrl && this.fileUrl !== '' && this.fileUrl !== post.photo) {
      post.photo = this.fileUrl;
    }
    post.title = title;
    post.description = description;
    this.postService.modifyPost(post, this.id);
    this.router.navigate(['/posts']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.postService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

}
