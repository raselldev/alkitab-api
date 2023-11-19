/**
 * This TypeScript function fetches Bible passages from a specific API, parses the response, and
 * modifies the structure of the data for efficiency before returning it as a JSON response.
 * @param {NextRequest} request - The `request` parameter is an object that contains information about
 * the incoming HTTP request. It includes properties such as `nextUrl` which represents the URL of the
 * request, `headers` which contains the headers of the request, and `method` which represents the HTTP
 * method used for the request (in
 * @returns The code is returning a JSON response containing the result of parsing an XML response from
 * the specified URL. The XML data is fetched from the URL specified in the `url` variable, and then
 * parsed using the `xml2js` library. The parsed result is then modified to have a more efficient
 * structure, and finally converted to a JSON string before being returned as the response.
 */
import { NextRequest } from "next/server";
import { parseString } from "xml2js";

export async function GET(request: NextRequest) {
  let result: any = {};
  const passage = request.nextUrl.searchParams.get("passage");
  const chapter = request.nextUrl.searchParams.get("num");
  const url = ` http://alkitab.sabda.org/api/passage.php?passage=${passage}${"+"}${chapter}`;

  try {
    const response = await fetch(url);
    const data = await response.text();
    parseString(data, (error, _result) => {
      if (!error) {
        result = _result;
      }
    });
  } catch (error) {
    console.log("error", error);
  }

  if (result && result.bible && result.bible.title && result.bible.title.length === 1) {
    result.bible.title = result.bible.title[0];
  }

  // Modify the structure to make it more efficient
  if (result && result.bible && result.bible.book && Array.isArray(result.bible.book)) {
    const books = result.bible.book.map((book: any) => {
      return {
        name: book["$"].name,
        book_id: book.book_id[0],
        title: book.title[0],
        chapter: {
          chap: book.chapter[0].chap[0],
          verses: book.chapter[0].verses[0].verse.map((verse: any) => {
            return {
              number: verse.number[0],
              title: verse.title ? verse.title[0] : undefined,
              text: verse.text[0]
            };
          })
        }
      };
    });

    // If there is only one book, set it directly without an array
    result.bible.book = books.length === 1 ? books[0] : books;
  }

  const jsonString = JSON.stringify(result, null, 2);
  return new Response(jsonString);
}
