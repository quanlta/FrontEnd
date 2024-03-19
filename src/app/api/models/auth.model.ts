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
  constructor(
    public id?: any,
    public name?: string,
    public price?: string,
    public type?: string,
    public rate?: number,
    public view?: number,
    public image?: string,
    public created_at?: string,
    public sections?: Section[]
  ) {}
}

export class Section {
  constructor(
    public sectionId?: number,
    public sectionName?: string,
    public articles?: Article[],
    public videos?: Video[],
    public quizzes?: Quiz[]
  ) {}
}

export class Article {
  constructor(
    public articleID?: number,
    public title?: string,
    public articleUrl?: string
  ) {}
}

export class Video {
  constructor(
    public videoId?: number,
    public title?: string,
    public description?: string,
    public videoData?: string,
    public isTrial?: boolean
  ) {}
}

export class Quiz {
  constructor(
    public id?: number,
    public title?: string,
    public questions?: Question[]
  ) {}
}

export class Question {
  constructor(
    public id?: number,
    public text?: string,
    public point?: number,
    public answers?: Answer[]
  ) {}
}

export class Answer {
  constructor(
    public id?: number,
    public text?: string,
    public correct?: boolean
  ) {}
}

