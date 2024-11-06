import React from "react";
import { Button } from "@/components/ui/button";
import {
  CloudUpload,
  Layout,
  PlusCircle,
  ShieldEllipsisIcon,
  Zap,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import UploadPdf from "./UploadPdfDialogue";

interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = () => {
  return (
    <div
      className="h-screen p-3 md:py-5 flex flex-col items-center  bg-stone-50 shadow-xl w-16 sm:w-24 md:w-48 lg:w-60">
      <div className="flex justify-center items-center gap-2 border-b-2 border-neutral-400 pb-3 w-full">
        <Zap size={30} />
        <h1 className=" text-xl hidden md:inline font-[oswald]">Textify</h1>
      </div>

      {/* Menu Options */}
      <div className="mt-10 w-full space-y-2">
        <UploadPdf>
          <Button className="w-full flex items-center justify-center lg:justify-start bg-zinc-900 md:rounded-lg rounded-full">
            <CloudUpload size={24} className="mr-0 lg:mr-2" />
            <span className="hidden md:inline">Upload PDF</span>
          </Button>
        </UploadPdf>

        <div className="flex gap-2 items-center md:justify-start justify-center p-1 mt-1 hover:bg-slate-100 rounded-lg cursor-pointer">
          <Layout size={24} />
          <span className="hidden md:inline ml-2">Workspace</span>
        </div>

        <div className="flex gap-2 items-center md:justify-start justify-center p-1 mt-1 hover:bg-slate-100 rounded-lg cursor-pointer">
          <ShieldEllipsisIcon size={24} />
          <span className="hidden md:inline ml-2">Upgrade</span>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mt-auto w-full mb-10 lg:mb-10 font-sans">
        <Progress value={33} className="hidden sm:block" />
        <p className="text-xs lg:text-sm mt-1 hidden md:flex">
          2 out of 10 PDFs uploaded
        </p>
        <p className="text-xs lg:text-sm text-gray-400 mt-2 hidden md:flex">
          Upgrade to upload more PDFs
        </p>
      </div>
    </div>
  );
};

export default SideBar;
