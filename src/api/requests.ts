import { UsersResponse } from '../types/types';

const apiUrl = `https://frontend-test-assignment-api.abz.agency/api/v1`;
// /users?page=1&count=5

export function request(url: string): Promise<UsersResponse> {
  return fetch(apiUrl + url).then((response) => response.json());
}

export async function getUsersByPage(
  pageNumber: number,
): Promise<UsersResponse> {
  const url = `/users?page=${pageNumber}&count=6`;
  const response = await request(url);

  return response;
}
