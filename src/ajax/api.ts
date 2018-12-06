import * as superagent from "superagent";

interface IApiValues {
  url: string;
  key: string;
}

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
      .get(url)
      .query({ key, q: `${query}&image_type=photo` })
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
