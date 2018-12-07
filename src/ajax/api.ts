import * as superagent from "superagent";

interface IApiValues {
  url: string;
  key: string;
}

/* NB: To make sure that the client does not have access to our personal
   api key for a third party service, the best way to handle this
   would be to create an endpoint on our own server (or a microservice)
   that takes the query and makes the request to the api server, 
   sort of like a pass-through.  If you do this, then not only can you
   keep this key safe in a secret.env file on your folder, but
   you can also impliment server-side caching so that you don't end up
   pinging the Pixabay servers too often (this is actually mentioned)
   in their API docs */
const defaultValues: IApiValues = {
  key: `9656065-a4094594c34f9ac14c7fc4c39`,
  url: `https://pixabay.com/api/`
};

const delay = (delayTime: number) =>
  new Promise(resolve => {
    setTimeout(resolve, delayTime);
  });

class Api {
  private url: string;
  private key: string;
  constructor(
    { url, key }: IApiValues = defaultValues,
    private testDelay: number = 0,
    private ajax = superagent
  ) {
    this.url = url;
    this.key = key;
  }
  public debugInfo() {
    const { url, key } = this;
    return { url, key };
  }
  public async getImages(query: string): Promise<any> {
    const { testDelay, ajax, url, key } = this;

    if (testDelay > 0) {
      await delay(testDelay);
    }

    return await ajax
      .get(`${url}?key=${key}&q=${query.trim().replace(/\s+/g, "+")}&image_type=photo`)
      .then(response => {
        console.log("response", JSON.stringify(response, null, 2));
        return response;
      })
      .catch((err: any) => {
        console.warn("Error in Api.getImages():", err);
      });
  }
}

export default Api;
