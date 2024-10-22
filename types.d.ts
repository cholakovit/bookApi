

type CreateTagRequest = {
  name: string
}

type CreateBookRequest = {
  title: string;
  author: string;
  categoryIds: number[];
  tags: string[];
};
  
type FieldConfig = {
  field: string
  minLength?: number
  isEmail?: boolean
  isArray?: boolean
}

type CategoryRequest = {
  name: string
}