import { User } from './../models/User';
import { PostService } from './../services/post.service';
import { Post } from './../models/Post';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  posts : Post[] = [];
  user : User = new User;
  following : User [] = [] ;
  aboutFlag : boolean = false ;
  aboutContent : String ='' ;
  postContent : String ='';
  constructor(private postService:PostService, private userService:UserService,
    private spinner: NgxSpinnerService, private toastr: ToastrService) { }

   async ngOnInit(): Promise<any>  {
     this.spinner.show();
     
      try {
      this.user = await this.userService.getMe();
     }
     catch(err){              
      this.toastr.warning("You are not logged in");  
     }
        console.log(this.user);
        if ( this.user == null) {
          this.spinner.hide();

        }      
        await this.updatePosts();
        await this.getFollowers();            
        this.spinner.hide();
  }

  about() : any {
     this.aboutFlag = !this.aboutFlag;

  }

  async updateAbout() : Promise<any> {
    this.user.about = this.aboutContent ;
    const data = await this.userService.updateUser(this.aboutContent);
    this.aboutFlag = !this.aboutFlag;
  }

  async updatePosts() : Promise<any> {
    this.posts = await this.postService.getPosts();
    this.posts?.reverse();        
    this.posts?.forEach((item:Post)=> item.createdOn = (new Date(item.createdOn)).toLocaleString());
    console.log(this.posts);
  }

  
  async delete(id:String) : Promise<any> {
    const data = await this.postService.deletePost(id);
    await this.updatePosts();
    console.log(data);
  }

  async getFollowers() : Promise<any> {
    const followerId = this.user.followers ;
    followerId.forEach(async (id) => {
      const data = await this.userService.getFollowing(id);
      this.following.push(...data);
    })
  }

  async unfollow(friend:User ) : Promise<any> {
    this.following = this.following.filter((follow)=> friend._id!=follow._id)
    await this.userService.unfollow(friend._id);
    await this.userService.getMe();
  }

  outOfFocus():void {
    this.aboutContent = this.user.about ;
  }

}
