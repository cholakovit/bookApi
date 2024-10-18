
type CreateBookRequest = {
  title: string;
  author: string;
  categories: Category[];
  tags: string[];
};
  
type FieldConfig = {
  field: string
  minLength?: number
  isEmail?: boolean
}

type CategoryRequest = {
  name: string
}