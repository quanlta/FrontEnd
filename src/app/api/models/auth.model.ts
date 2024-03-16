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
