import { api } from "@/config/mwn";

interface CharacterFullPageQueryResponse {
  pages: Array<{
    pageid: number;
    ns: number;
    title: string;
    extract: string;
    missing?: boolean;
  }>;
}

export const getCharacterFullPage = async (
  name: string,
): Promise<{ message: string }> => {
  const response = await api
    .request({
      action: "query",
      prop: "extracts",
      titles: name,
    })
    .then((response) => {
      const data = response as CharacterFullPageQueryResponse;
      return data.pages[0];
    });

  if (response.missing) {
    console.log(`Character ${name} not found`);
    return;
  }
};
