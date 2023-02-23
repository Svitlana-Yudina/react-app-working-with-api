export type Token = {
  success: boolean,
  token: string,
};

export type Inputs = {
  name: string,
  email: string
  phone: string
  'position_id': number,
  photo: FileList,
};
