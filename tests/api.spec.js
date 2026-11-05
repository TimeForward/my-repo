const { test, expect } = require('@playwright/test');

const baseURL = 'https://restful-booker.herokuapp.com';
const original = {
  firstname: 'Test',
  lastname: 'Student',
  totalprice: 123,
  depositpaid: true,
  bookingdates: { checkin: '2027-04-10', checkout: '2027-04-14' },
  additionalneeds: 'Breakfast',
};
const changed = { ...original, firstname: 'Updated', totalprice: 456 };
let bookingId;
let authToken;

test.describe('ДЗ 12: CRUD бронирования @api', () => {
  test.describe.configure({ mode: 'serial' });

  test('1. Создание POST', async ({ request }) => {
    const response = await request.post(`${baseURL}/booking`, {
      data: original,
      headers: { Accept: 'application/json' },
    });
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.bookingid).toBeDefined();
    expect(data.booking).toEqual(original);
    bookingId = data.bookingid;
  });

  test('2. Чтение GET', async ({ request }) => {
    const response = await request.get(`${baseURL}/booking/${bookingId}`);
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual(original);
  });

  test('3. Обновление PUT', async ({ request }) => {
    const auth = await request.post(`${baseURL}/auth`, {
      data: { username: 'admin', password: 'password123' },
    });
    expect(auth.status()).toBe(200);
    authToken = (await auth.json()).token;
    expect(authToken).toBeTruthy();
    const response = await request.put(`${baseURL}/booking/${bookingId}`, {
      data: changed,
      headers: {
        Cookie: `token=${authToken}`,
        Accept: 'application/json',
      },
    });
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual(changed);
  });

  test('4. Удаление DELETE', async ({ request }) => {
    const response = await request.delete(`${baseURL}/booking/${bookingId}`, {
      headers: { Cookie: `token=${authToken}` },
    });
    expect(response.status()).toBe(201);
    const check = await request.get(`${baseURL}/booking/${bookingId}`);
    expect(check.status()).toBe(404);
  });
});
