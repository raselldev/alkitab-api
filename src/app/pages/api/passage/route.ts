import { NextRequest } from "next/server";
import { parseString } from "xml2js";

export async function GET(request: NextRequest) {
  let result = {};
  const passage = request.nextUrl.searchParams.get("passage");
  const chapter = request.nextUrl.searchParams.get("chapter");
  const url = `http://alkitab.sabda.org/api/passage.php?passage=${passage}${"+"}${chapter}`;
  await fetch(url)
    .then((response) => response.text())
    .then((data) =>
      parseString(data, (error, _result) => {
        if (!error) {
          result = _result;
        }
      })
    )
    .catch((error) => console.log("error", error));
  return new Response(JSON.stringify(result));
}
