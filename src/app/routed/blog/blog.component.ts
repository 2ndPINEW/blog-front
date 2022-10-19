import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MetaData } from 'src/app/shared/service/blog.interface';
import { BlogApiService } from '../../shared/service/blog.api.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private api: BlogApiService,
    private sanitizer: DomSanitizer
  ) { }

  path = this.route.snapshot.paramMap.get('path')
  html: SafeHtml | undefined
  metaData: MetaData | undefined

  ngOnInit(): void {
    if (!this.path) {
      return
    }
    this.api.getBlogContent(this.path).subscribe(data => {
      this.html = this.sanitizer.bypassSecurityTrustHtml(data.html)
      this.metaData = data.metaData
    })
  }

}
