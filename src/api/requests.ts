import { Token } from '../types/otherTypes';
import { PositionResponse } from '../types/positionTypes';
import {
  PostUserResponseFail,
  PostUserResponseOK,
  UsersResponse,
} from '../types/userTypes';

const apiUrl = `https://frontend-test-assignment-api.abz.agency/api/v1`;

// returns a promise resolved after a given delay
export function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export function request<T>(url: string, data?: RequestInit): Promise<T> {
  // I use the wait function to see the loader))
  return wait(300)
    .then(() => {
      if (data) {
        return fetch(apiUrl + url, data);
      } else {
        return fetch(apiUrl + url);
      }
    })
    .then((response) => response.json())
    .catch((err) => {
      throw new Error(`${err}`);
    });
}

export async function getUsersByPage(
  pageNumber: number,
): Promise<UsersResponse> {
  // we should update ALL users (not only add new)
  // to avoid duplication of old users,
  // if new ones have allready registered in another browser
  const url = `/users?page=1&count=${pageNumber * 6}`;
  const response = await request<UsersResponse>(url);

  return response;
}

export async function getPositions(): Promise<PositionResponse> {
  const url = `/positions`;
  const response = await request<PositionResponse>(url);

  return response;
}

export async function getToken(): Promise<Token> {
  const url = `/token`;
  const response = await request<Token>(url);

  return response;
}

export async function addUser(
  token: string,
  data: BodyInit,
): Promise<PostUserResponseFail | PostUserResponseOK> {
  const url = '/users';
  const options = { method: 'POST',
    body: data,
    headers: { 'Token': token } }
  const response = await request<PostUserResponseFail | PostUserResponseOK>(
    url,
    options,
  );

  return response;
}
