import { api } from "@/config/mwn";
import { CosmereResponse } from "@/types/api.types";

interface CharacterFullPageQueryResponse {
  query: {
    pages: Array<{
      pageid: number;
      ns: number;
      title: string;
      extract: string;
      missing?: boolean;
    }>;
  };
}

export const getCharacterFullHtmlPage = async (
  name: string,
): Promise<CosmereResponse<string>> => {
  console.log("Triggered getCharacterFullHtmlPage");
  try {
    const response = await api
      .request({
        action: "query",
        prop: "extracts",
        titles: name,
      })
      .then((response) => {
        const data = response as CharacterFullPageQueryResponse;
        return data.query.pages[0];
      });

    if (response.missing) {
      console.log(`Character ${name} not found`);
      return {
        data: null,
        success: false,
        error: `Character ${name} not found.`,
      };
    }
    return {
      data: response.extract,
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: null,
      error:
        "Something went wrong. Please try again later or contact the developer.",
    };
  }
};

export default getCharacterFullHtmlPage;
