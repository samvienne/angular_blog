export class Post {
    photo: string;
    likeNumber: number;
    dislikeNumber: number;

    constructor(public title: string, public description: string, public idPost: number) {

    }
}