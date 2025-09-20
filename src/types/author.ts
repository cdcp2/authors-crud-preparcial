export type Author = {
  id: number;
  name: string;
  birthDate: string;
  image: string;
  description: string;
};

export type NewAuthor = Omit<Author, 'id'>;
