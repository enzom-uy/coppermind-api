import { getCharacterFullHtmlPage } from "@/features/characters/index";
import getCharacter from "./features/characters/get-character";

async function main() {
  const test = await getCharacter("kaladin");
  console.log(test);
}
main();
