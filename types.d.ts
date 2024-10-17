
type CreateBookRequest = {
  title: string;
  author: string;
  categories: string[];
  tags: string[];
};
  
type FieldConfig = {
  field: string
  minLength?: number
  isEmail?: boolean
}