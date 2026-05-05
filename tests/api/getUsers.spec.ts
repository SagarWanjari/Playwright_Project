import { expect } from "@playwright/test";
import { test } from '../../fixtures/pageFixtures'

test('API Flow', async ({userApi})=> {

let id :number;

await test.step('GET Users ', async ({})=> {
const response = await userApi.getUsers(2);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.data.length).toBeGreaterThan(0);

})

await test.step("POST Users", async ({})=>{

 const response =  await userApi.createUser({ name: 'Sagar', job: 'QA' });

 expect(response.status()).toBe(201);
  const body = await response.json();
//   console.log(body)
   id = body.id;
  expect(body.name).toBe('Sagar');
})

await test.step('Update user', async ({})=>{
   const response = await userApi.updateUser(id, {name:'Sagar',job:'AI ENgineer'}) 
   expect (response.status()).toBe(200);
   const body = await response.json();
   // console.log(body);
   expect(body.name).toBe('Sagar');
})

await test.step('Delete user', async ({})=>{
   const response = await userApi.deleteUser(id) ;
   expect (response.status()).toBe(204);
})
});