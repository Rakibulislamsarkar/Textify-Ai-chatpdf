import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// const pdfUrl =
//   "https://ideal-condor-949.convex.cloud/api/storage/dd34b4ee-5a98-4194-a92e-5ae8a21165e1";

export async function GET(req: NextRequest) {

  const reqUrl = req.url;
  const searchParams = new URL(reqUrl).searchParams;
  const pdfUrl = searchParams.get("pdfUrl");

  if (!pdfUrl) {
    return NextResponse.json({ error: "PDF URL is required" }, { status: 400 });
  }

  console.log(pdfUrl);

  //1. lOAD THE PDF FILE
  const response = await fetch(pdfUrl);
  const data = await response.blob();
  const loader = new WebPDFLoader(data);
  const docs = await loader.load();

  let pdfTextContent = "";
  docs.forEach((doc) => {
    pdfTextContent = pdfTextContent + doc.pageContent + " ";
  });

  //2. SPLIT THE TEXT INTO CHUNKS
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 20,
  });
  const texts = await splitter.createDocuments([pdfTextContent]);

  let splitterList: string[] = [];
  texts.forEach((doc) => {
    splitterList.push(doc.pageContent);
  });

  return NextResponse.json({ result: splitterList });
}
