import { APIRequestContext } from "@playwright/test";


export class UserApiClient {
    private request: APIRequestContext;

    constructor(request:APIRequestContext){
        this.request = request;
    }
    

    async getUsers(page : number = 2 ){
     const response =    await this.request.get(`/api/users?page=${page}`);
    return response;         
    }

    async createUser(payload: { name: string; job: string }) {
    const response = await this.request.post('/api/users', {
      data: payload
    });

    return response;
  }

  async updateUser(id: number, payload: { name?: string; job?: string }) {
    const response = await this.request.put(`/api/users/${id}`, {
      data: payload
    });

    return response;
  }

  async deleteUser(id: number) {
    const response = await this.request.delete(`/api/users/${id}`, {
    });

    return response;
  }
}