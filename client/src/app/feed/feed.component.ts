import { Post } from './../models/Post';
import { PostService } from './../services/post.service';
import { User } from './../models/User';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../services/user.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  user: User = new User;
  profiles: User[] = [];
  filteredProfiles: User[] = [];
  followerId: String = '';
  followerIds: String[] = [];
  feeds: Post[] = [];
  postContent: String = '';
  postFlag: boolean = false;


  constructor(private service: UserService, private postService: PostService,
    private spinner: NgxSpinnerService, private router: Router, private toastr: ToastrService) { }

  async ngOnInit(): Promise<any> {
    try {
      this.user = await this.service.getMe();
    }
    catch (err) {
      this.toastr.warning("You are not logged in");
      console.log(err);
    }

    this.spinner.show()
    this.profiles = await this.service.getUsers();
    this.followerIds = this.user.followers;
    this.getProfiles();
    this.getFollowerPosts();
    console.log("End");
    this.spinner.hide();
  }

  async getProfiles(): Promise<any> {
    console.log(this.followerIds);
    console.log(this.profiles)
    this.profiles.forEach((profile) => {
      if (!this.followerIds.includes(profile._id)) {
        this.filteredProfiles.push(profile);
      }
    })

  }

  async getFollowerPosts(): Promise<any> {
    this.followerIds.forEach(async (followerId) => {
      this.feeds = await this.postService.getFollowerPosts();
    })
  }



  async addFollower(followerId: String): Promise<any> {
    const data = await this.postService.addFollower(followerId);
    this.filteredProfiles = this.filteredProfiles.filter((follow) => followerId != follow._id)
  }

  async addPost(): Promise<any> {
    const data = await this.postService.addPost(this.postContent, this.user);
    this.postContent = '';
    this.getFollowerPosts();
  }



}
