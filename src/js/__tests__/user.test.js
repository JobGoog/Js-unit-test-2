import { loadUser, saveUser } from '../user';
import { httpGet } from '../http';

jest.mock('../http');

describe('User Functions', () => {
  test('should throw error for saveUser', () => {
    expect(() => saveUser({ name: 'test' })).toThrow('Unimplemented');
  });

  test('should call httpGet in loadUser', () => {
    httpGet.mockImplementation((url) => {
      if (url === 'http://server:8080/users/1') {
        return JSON.stringify({ id: 1, name: 'John' });
      }
      throw new Error('Invalid URL');
    });

    const result = loadUser(1);
    expect(httpGet).toHaveBeenCalledWith('http://server:8080/users/1');
    expect(result).toEqual({ id: 1, name: 'John' });
  });

  test('should handle httpGet throwing an error', () => {
    httpGet.mockImplementation(() => {
      throw new Error('Network Error');
    });

    expect(() => loadUser(1)).toThrow('Network Error');
  });
});
