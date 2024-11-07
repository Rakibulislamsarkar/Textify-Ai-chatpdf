"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import PdfViewer from "../_components/PdfViewer";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import TextEditor from "../_components/TextEditor";

type Props = {};

const WorkspacePage = (props: Props) => {
  const { fileId } = useParams();
  const fileInfo = useQuery(api.messages.getFileById, {
    fileId: fileId as string,
  });

  useEffect(() => {
    console.log(fileInfo);
  }, [fileInfo]);
  return (
    <div>
      <WorkspaceHeader />
      <div className="grid grid-cols-2 gap-4">
        <div>
          {/* PDF SCREEN */}
          <PdfViewer fileUrl={fileInfo?.fileUrl} />
        </div>
        <div>
          {/* CHAT SCREEN */}
          <TextEditor />
        </div>
      </div>
    </div>
  );
};

export default WorkspacePage;
