import { expect } from "@playwright/test";
import { test } from '../../fixtures/pageFixtures'

test.describe.configure({ mode: 'serial' });

let id :number;

test('GET Users ', async ({userApi})=> {
const response = await userApi.getUsers(2);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.data.length).toBeGreaterThan(0);

})

test("POST Users", async ({userApi})=>{

 const response =  await userApi.createUser({ name: 'Sagar', job: 'QA' });

 expect(response.status()).toBe(201);
  const body = await response.json();
//   console.log(body)
   id = body.id;
  expect(body.name).toBe('Sagar');
})

test('Update user', async ({userApi})=>{
   const response = await userApi.updateUser(id, {name:'Sagar',job:'AI ENgineer'}) 
   expect (response.status()).toBe(200);
   const body = await response.json();
   // console.log(body);
   expect(body.name).toBe('Sagar');
})

test('Delete user', async ({userApi})=>{
   const response = await userApi.deleteUser(id) ;
   expect (response.status()).toBe(204);
})