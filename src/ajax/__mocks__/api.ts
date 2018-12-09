
class Api {
  public async getImages(query: string): Promise<any> {
    return {
      body: { foo: "bar" }
    };
  }
}

export default Api;
