
type CreateUserRequest = {
  name: string
  email: string
  password: string
  role: string
}

type CreateTagRequest = {
  name: string
}

type CreateBookRequest = {
  title: string;
  author: string;
  categoryIds: number[];
  tagIds: number[];
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

