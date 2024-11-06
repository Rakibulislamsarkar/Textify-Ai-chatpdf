import React, { ReactNode } from "react";
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

// Define props type for the component
type Props = { children: ReactNode };

const UploadPdf: React.FC<Props> = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-md p-4 md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl font-semibold text-center">Upload PDF Files</DialogTitle>
          <DialogDescription asChild>
            <div>
              <h2 className="mt-4 text-base md:text-lg font-medium text-left">Select Files to Upload</h2>
              <div className="mt-2 p-3 border border-gray-300 rounded-md bg-gray-50">
                <input type="file" className="w-full cursor-pointer" accept=".pdf, .doc, .docx"/>
              </div>
              <div className="mt-4">
                <label className="block text-base font-medium mb-1 text-left">File Name</label>
                <Input placeholder="Enter File Name" className="w-full" />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 flex flex-col sm:flex-row sm:justify-end gap-2">
          <DialogClose asChild>
            <Button variant="destructive" className="w-full sm:w-auto">Cancel</Button>
          </DialogClose>
          <Button className="w-full sm:w-auto py-6 sm:py-0">Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadPdf;
