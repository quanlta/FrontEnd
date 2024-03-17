export class Auth {
  id?: any;
  email?: string;
  password?: string;
}

export class Courses {
  id?: any;
  name?: string | undefined;
  price?: string | undefined;
  type?: string | undefined;
  rate?: number | undefined;
  view?: number | undefined;
  image?: string | undefined;
  created_at?: string | undefined;
}
export class ResponeCourseDTO {
  id: any;
  name: string;
  price: string;
  type: string;
  rate: number;
  view: number;
  image: string;
  created_at: string;

  constructor(
    id: any,
    name: string,
    price: string,
    type: string,
    rate: number,
    view: number,
    image: string,
    created_at: string
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.type = type;
    this.rate = rate;
    this.view = view;
    this.image = image;
    this.created_at = created_at;
  }
}
  
export class CourseDetail {
  id?: any;
  name?: string | undefined;
  price?: string | undefined;
  type?: string | undefined;
  rate?: number | undefined;
  view?: number | undefined;
  image?: string | undefined;
  created_at?: string | undefined;
  sections?: Section[] | undefined;

  constructor(
    id: any,
    name: string,
    price: string,
    type: string,
    rate: number,
    view: number,
    image: string,
    created_at: string,
    sections?: Section[]
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.type = type;
    this.rate = rate;
    this.view = view;
    this.image = image;
    this.created_at = created_at;
    this.sections = sections;
  }
}

export class Section {
  sectionId?: number;
  sectionName?: string;
  articles?: Article[];
  videos?: Video[];
  quizzes?: Quiz[];

  constructor(
    sectionId: number,
    sectionName: string,
    articles: Article[],
    videos: Video[],
    quizzes: Quiz[]
  ) {
    this.sectionId = sectionId;
    this.sectionName = sectionName;
    this.articles = articles;
    this.videos = videos;
    this.quizzes = quizzes;
  }
}

export class Article {
  articleID?: number;
  title?: string;
  articleUrl?: string;

  constructor(articleID: number, title: string, articleUrl: string) {
    this.articleID = articleID;
    this.title = title;
    this.articleUrl = articleUrl;
  }
}

export class Video {
  videoId?: number;
  title?: string;
  description?: string;
  videoData?: string;
  isTrial?: boolean;

  constructor(videoId: number, title: string, description: string, videoData: string, isTrial: boolean) {
    this.videoId = videoId;
    this.title = title;
    this.description = description;
    this.videoData = videoData;
    this.isTrial = isTrial;
  }
}

export class Quiz {
  id?: number;
  title?: string;
  questions?: Question[];

  constructor(id: number, title: string, questions: Question[]) {
    this.id = id;
    this.title = title;
    this.questions = questions;
  }
}

export class Question {
  id?: number;
  text?: string;
  point?: number;
  answers?: Answer[];

  constructor(id: number, text: string, point: number, answers: Answer[]) {
    this.id = id;
    this.text = text;
    this.point = point;
    this.answers = answers;
  }
}

export class Answer {
  id?: number;
  text?: string;
  correct?: boolean;

  constructor(id: number, text: string, correct: boolean) {
    this.id = id;
    this.text = text;
    this.correct = correct;
  }
}

