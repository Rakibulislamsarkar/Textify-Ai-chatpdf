"use client";

import React, { ReactNode, FormEvent, useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAction, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Loader2, UploadCloudIcon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

type Props = { children: ReactNode };

const UploadPdf: React.FC<Props> = ({ children }) => {
  const generateUploadUrl = useMutation(api.messages.generateUploadUrl);
  const addFileEntryToDb = useMutation(api.messages.AddFileEntryToDb);
  const getFileUrl = useMutation(api.messages.getFileUrl);
  const embedDocument = useAction(api.myActions.ingest);
  const user = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const OnFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };
  const OnUpload = async () => {
    setLoading(true);
    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();

    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file?.type || "" },
      body: file,
    });
    const { storageId } = await result.json();
    console.log("StorageId", storageId);
    const fileId = uuidv4();
    const fileUrl = await getFileUrl({ storageId: storageId });
    // Step 3: Save the newly allocated storage id to the database
    const response = await addFileEntryToDb({
      fileId: fileId,
      storageId: storageId,
      fileName: fileName ?? "Untitled File",
      fileUrl: fileUrl ?? "",
      createdBy: user?.user?.emailAddresses[0]?.emailAddress ?? "",
    });
    console.log(response);

    // API CALL TO FETCH PDF PROCESSED DATA
    const ApiResponse = await axios.get("/api/pdf-loader?pdfUrl=" + fileUrl);
    console.log(ApiResponse.data.result);
    await embedDocument({
      fileId: fileId,
      splitText: ApiResponse.data.result,
    });

    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          <UploadCloudIcon className="w-4 h-4 mr-2" />
          Upload PDF
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md p-4 md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl font-semibold text-center">
            Upload PDF Files
          </DialogTitle>
          <DialogDescription asChild>
            <div>
              <h2 className="mt-4 text-base md:text-lg font-medium text-left">
                Select Files to Upload
              </h2>
              <div className="mt-2 p-3 border border-gray-300 rounded-md bg-gray-50">
                <input
                  type="file"
                  className="w-full cursor-pointer"
                  accept=".pdf, .doc, .docx"
                  onChange={OnFileSelect}
                />
              </div>
              <div className="mt-4">
                <label className="block text-base font-medium mb-1 text-left">
                  File Name
                </label>
                <Input
                  placeholder="Enter File Name"
                  className="w-full"
                  onChange={(event) => setFileName(event.target.value)}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 flex flex-col sm:flex-row sm:justify-end gap-2">
          <DialogClose asChild>
            <Button variant="destructive" className="w-full sm:w-auto">
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="w-full sm:w-auto py-6 sm:py-0"
            onClick={OnUpload}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadPdf;
