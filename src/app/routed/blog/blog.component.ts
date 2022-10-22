import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPageData } from 'src/app/shared/service/blog.interface';
import { BlogApiService } from '../../shared/service/blog.api.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private api: BlogApiService
  ) { }

  path = this.route.snapshot.paramMap.get('path')
  data: BlogPageData | undefined

  ngOnInit(): void {
    if (!this.path) {
      return
    }
    this.api.getBlogContent(this.path).subscribe(data => {
      this.data = data
    })
  }
}
