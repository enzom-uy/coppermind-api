import { getCharacterFullHtmlPage } from "@/features/characters/index";

async function main() {
  const test = await getCharacterFullHtmlPage("kaladin");
  console.log(test);
}
main();
