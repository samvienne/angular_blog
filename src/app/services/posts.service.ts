import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../model/Post.model';
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import { Comment } from '../model/Comment.model';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts: Post[] = [];
  postSubject = new Subject<Post[]>();
  comments: Comment[] = [];
  commentSubject = new Subject<Comment[]>();

  constructor() { }

  emitPosts() {
    this.postSubject.next(this.posts);
  }

  emitComments() {
    this.commentSubject.next(this.comments);
  }

  savePosts() {
    firebase.database().ref('/posts').set(this.posts);
    this.emitComments();
  }

  getPosts() {
    firebase.database().ref('/posts').on('value', (data) => {
      this.posts = data.val() ? data.val() : [];
      this.emitPosts();
    });
  }

  modifyPost(post: Post, id:number) {
    firebase.database().ref('/posts/'+id).set(post);
    this.emitPosts();
  }

  saveComment() {
    firebase.database().ref('/comments').set(this.comments);
  }

  getComments() {
    let targetRef= firebase.database().ref('/comments');
    targetRef.on('value', (snapshot) => {
      this.comments = snapshot.val() ? snapshot.val() : [];
      this.emitComments();
    });
  }

  getSinglePost(id:number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/posts/'+ id).once('value').then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewPost(newPost: Post) {
    this.posts.push(newPost);
    this.savePosts();
    this.emitPosts();
  }

  createNewComment(newComment: Comment) {
    this.comments.push(newComment);
    this.saveComment();
    this.emitComments();
  }

  removePost(post: Post) {
    if(post.photo) {
      const storageRef= firebase.storage().refFromURL(post.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo supprimée');
        }
      ).catch(
        (error) => {
          console.log('Fichier non trouvé '+ error);
        }
      );
    }
    const index = this.posts.findIndex(
      (postEl) => {
        if(postEl === post) {
          return true;
        }
      }
    );
    this.posts.splice(index, 1);
    this.savePosts();
    this.emitPosts();
    this.removeComment(post.idPost);
  }

  removeComment(id:number) {
    for(var i = 0; i<this.comments.length; i++) {
     if(this.comments[i].idPost === id) {
       this.comments.splice(i--, 1);
     }
    }
    this.saveComment();
    this.emitComments();
  }

  saveLikes(post: Post) {
    post.likeNumber++;
    this.savePosts();
    this.emitPosts();
  }

  saveDislikes(post: Post) {
    post.dislikeNumber ++;
    this.savePosts();
    this.emitPosts();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve,reject) => {
        const uniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref().child('images/' + uniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('chargement...');
          },
          (error) => {
            console.log('Erreur de chargement: '+ error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }


}
