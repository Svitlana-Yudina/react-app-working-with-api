import { PositionResponse } from '../types/positionTypes';
import { UsersResponse } from '../types/userTypes';

const apiUrl = `https://frontend-test-assignment-api.abz.agency/api/v1`;

// returns a promise resolved after a given delay
export function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export function request<T>(url: string): Promise<T> {
  // I use the wait function to see the loader))
  return wait(300)
    .then(() => fetch(apiUrl + url))
    .then((response) => response.json())
    .catch((err) => {
      throw new Error(`${err}`);
    });
}

export async function getUsersByPage(
  pageNumber: number,
): Promise<UsersResponse> {
  const url = `/users?page=${pageNumber}&count=6`;
  const response = await request<UsersResponse>(url);

  return response;
}

export async function getPositions(): Promise<PositionResponse> {
  const url = `/positions`;
  const response = await request<PositionResponse>(url);

  return response;
}
