import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/model/Post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  id: number;

  constructor(private router: Router, private postService: PostsService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.postForm = this.formBuilder.group(
      {
        title: ['', Validators.required],
        description: ['', Validators.required]
      });
  }

  onSavePost() {
    const id = Date.now();
    const title = this.postForm.get('title').value;
    const description = this.postForm.get('description').value;
    const newPost = new Post(title, description, id);
    if(this.fileUrl && this.fileUrl !== '') {
      newPost.photo = this.fileUrl;
    }
    newPost.likeNumber = 0;
    newPost.dislikeNumber = 0;
    this.postService.createNewPost(newPost);
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
