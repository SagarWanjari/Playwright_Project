import { expect } from "@playwright/test";
import { test } from '../../fixtures/pageFixtures'

test('API Flow', async ({userApi})=> {
let id :number;

test.step('GETv User', async ({})=> {
   const response = await userApi.getUsers(2);
  expect(response.status()).toBe(200);
  const body = await response.json();

  //Validata if page and porperty present 
   expect(body).toHaveProperty('page');
   expect(body).toHaveProperty('data')

   //Validata type of page and porperty  
   expect(typeof body.page).toBe('number');
   expect(Array.isArray(body.data)).toBe(true);

   //Validata if page and porperty present 
   const user = body.data[0];
   expect(user).toHaveProperty('id');
   expect(user).toHaveProperty('email');
   expect(user).toHaveProperty('first_name');
   expect(user).toHaveProperty('last_name');

   //Validata type of page and porperty 
   expect(typeof user.id).toBe('number');
   expect(typeof user.email).toBe('string');
   expect(typeof user.first_name).toBe('string');
   expect(typeof user.last_name).toBe('string');

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
   const response = await userApi.updateUser(id, {name:'Sagar',job:'AI Engineer'}) 
   expect (response.status()).toBe(200);
   const body = await response.json();
   // console.log(body);
   expect(body.job).toBe('AI Engineer');
})

await test.step('Delete user', async ({})=>{
   const response = await userApi.deleteUser(id) ;
   expect (response.status()).toBe(204);
})
});


test('invalid user id', async ({userApi})=> {
   
const response = await userApi.getUsersByID(9999);

  expect(response.status()).toBe(404);

  const body = await response.json();
  expect(body).toEqual({});

})

 test('Missing Payload',async ({userApi})=>{
  const response = await userApi.createUser({} as any);
  expect(await response.status()).toBe(201);
   const body = await response.json();
 })

 test('Invalid User Endpoint',async ({request})=>{
   
  const response = await request.get('https://reqres.in/data/ram');
  expect(await response.status()).toBe(404);
 })

