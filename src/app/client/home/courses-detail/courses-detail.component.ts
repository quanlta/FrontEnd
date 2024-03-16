import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { courses } from '../../../data';
interface PlaylistItem {
  id: number;
  src: string;
  name: string;
}
@Component({
  selector: 'app-courses-detail',
  standalone: true,
  imports: [],
  templateUrl: './courses-detail.component.html',
  styleUrl: './courses-detail.component.css',
})
export class CoursesDetailComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  currentURL: string;
  coursesId = 0;
  coursesDetail: any;
  coursesList: any;
  selectedVideo: any = false;
  cardItem: any = [];
  playlist: PlaylistItem[] = [
    {
      id: 1,
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      name: 'BigBuckBunny',
    },
    {
      id: 2,
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      name: 'ElephantsDream',
    },
    {
      id: 3,
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      name: 'ForBiggerBlazes',
    },
  ];
  currentTrackIndex = 0;
  constructor(private router: Router) {
    this.coursesId = Number(this.route.snapshot.params['id']);
    this.currentURL = this.router.url;
  }

  ngOnInit() {
    this.coursesList = courses;
    let url = this.currentURL;
    let storedCardItem: any = localStorage.getItem('cardItem');
    this.cardItem = JSON.parse(storedCardItem);

    let courseId = url.match(/\/courses\/(\d+)/);


    if (courseId) {
      let extractedId = courseId[1];
      this.coursesDetail = courses.find(
        (course) => course.id == Number(extractedId)
      );
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  onChangeVideo(video: any) {
    this.selectedVideo = false;

    setTimeout(() => {
      this.selectedVideo = video.src;
    }, 1000);

  }

  onAddtoCard(c: any) {
    const cardItem = JSON.stringify(c);

    if (this.cardItem && this.cardItem.length) {
      this.cardItem.push(JSON.parse(cardItem));
    } else {
      this.cardItem = [JSON.parse(cardItem)];
    }

    localStorage.setItem('cardItem', JSON.stringify(this.cardItem));
    window.location.reload()
  }
}
