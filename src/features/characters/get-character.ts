import { api } from "@/config/mwn";
import { CosmereResponse } from "@/types/api.types";
import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";

export type CharacterInfoboxOptions =
  | "name"
  | "parents"
  | "siblings"
  | "relatives"
  | "born"
  | "abilities"
  | "children"
  | "descendants"
  | "bonded";

interface CharacterInfoboxQueryResponse {
  parse: {
    title: string;
    pageid: number;
    parsetree: string;
  };
}

export type CharacterInfoboxItem = {
  name: CharacterInfoboxOptions;
  equals: "=";
  value: string | Record<any, any>;
};

interface CharacterXMLData {
  root: {
    template: [
      {
        part: Array<CharacterInfoboxItem>;
      },
    ];
  };
}

function parseWikiString(wikiString: string) {
  return wikiString.replace(/\[\[(.*?)\]\]/g, "$1");
}

export const getCharacter = async (
  name: string,
  // TODO: type the CosmereResponse obj
): Promise<CosmereResponse<any>> => {
  try {
    console.log("Triggered getCharacter");
    const response = await api
      .request({
        action: "parse",
        prop: "parsetree",
        format: "json",
        page: name,
      })
      .then((response) => {
        const data = response as CharacterInfoboxQueryResponse;
        return data;
      });

    const parser = new XMLParser();
    const xmlData = response.parse.parsetree;
    const jObj = parser.parse(xmlData) as CharacterXMLData;

    const parsedData = jObj.root.template[0].part;

    const parents = parsedData.filter((item) => {
      return item.name === "parents";
    })[0];

    return {
      success: true,
      data: {
        parents: parents.value
          ? parseWikiString(parents.value as string)
          : null,
      },
    };
  } catch (error) {
    return {
      success: false,
      error:
        "Something went wrong. Please try again later or contact the developer.",
      data: null,
    };
  }
};

export default getCharacter;
