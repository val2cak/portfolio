export interface Post {
  sys: {
    id: string;
  };
  fields: {
    name: string;
    year: string;
    image: {
      fields: {
        file: {
          url: string;
        };
        description: string;
      };
    };
    description: string;
    shortDescription: string;
    tags: string[];
    slug: string;
    design: string;
    live: string;
    code: string;
  };
}
