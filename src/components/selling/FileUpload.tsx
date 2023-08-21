import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DropResult } from "react-beautiful-dnd";

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { UploadCloud, Eye } from "lucide-react";
import { toBase64 } from "@/utils";
import { Images } from "@/types/types";

interface FileWithPreview extends File {
  preview?: string;
}

type Props = {
  onUpload: (files: Images[]) => void;
  onDelete: (file: Images) => void;
  onReorder: (files: Images[]) => void;
  currentImages?: any[];
};

const FileUpload: React.FC<Props> = ({
  onUpload,
  onDelete,
  onReorder,
  currentImages,
}) => {
  const currentImagesWithPreview = currentImages?.map((image) => {
    const imageUrl = image.imagePath; // Assuming imagePath is the URL of the image
    const file = new File([], imageUrl, { type: "image/*" });

    return Object.assign(file, {
      preview: imageUrl,
    });
  });
  const [cover, setCover] = useState<string | null>(
    currentImagesWithPreview![0]?.preview || null
  );
  const [files, setFiles] = useState<FileWithPreview[]>(
    currentImagesWithPreview! || []
  );
  const [isHovered, setIsHovered] = useState<string | null>(null);

  useEffect(() => {
    return () =>
      files.forEach((file) => URL.revokeObjectURL(file.preview || ""));
  }, []);

  useEffect(() => {
    if (files?.length === 1) {
      setCover(files[0].preview);
    }
  }, [files]);

  const onDrop = async (acceptedFiles: File[]) => {
    const newFiles = await Promise.all(
      acceptedFiles.map(async (file: File, idx: number) => {
        const base64 = await toBase64(file);
        return {
          imageOrder: files.length + idx,
          //@ts-ignore
          image: base64.split(",")[1],
        } as Images;
      })
    );
    onUpload(newFiles);

    setFiles((prev) => [
      ...prev,
      ...acceptedFiles.map((file: File) => {
        const url = URL.createObjectURL(file);
        return Object.assign(file, {
          preview: url,
        });
      }),
    ]);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      "image/*": [],
    },
    noClick: true,
    noKeyboard: true,
    onDrop,
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reorderedFiles = Array.from(files);
    const [removed] = reorderedFiles.splice(result.source.index, 1);
    reorderedFiles.splice(result.destination.index, 0, removed);

    const newFiles = reorderedFiles.map((file: any, idx: number) => {
      return {
        ...file,
        imageOrder: idx,
      } as Images;
    });
    onReorder(newFiles);
    setFiles(reorderedFiles);
  };

  return (
    <div className="">
      <div className="relative border border-dashed border-primary w-full h-[300px] my-4">
        {cover && (
          <Image
            src={cover}
            alt="Cover Image"
            fill={true}
            className="absolute top-0 left-0 w-full h-full object-contain bg-white"
          />
        )}
      </div>

      <aside>
        {/* <h4 className="mb-2 text-sm text-center font-semibold">Images</h4> */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-wrap gap-x-2 gap-y-2"
              >
                {files?.map(
                  (file, index) =>
                    file.preview !== cover && (
                      <Draggable
                        draggableId={file.name}
                        index={index}
                        key={file.name}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="relative w-20 h-20"
                            onMouseEnter={() => setIsHovered(file.name)}
                            onMouseLeave={() => setIsHovered(null)}
                          >
                            <img
                              src={file.preview}
                              alt={file.name}
                              className="w-full h-full object-cover"
                            />
                            {isHovered === file.name && (
                              <div className="absolute top-0 left-0 flex flex-col justify-between text-white">
                                <button
                                  className="focus:outline-none bg-primary text-xs font-medium"
                                  onClick={() => setCover(file.preview)}
                                >
                                  Set as cover
                                </button>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Eye
                                      style={{ cursor: "pointer" }}
                                      className="text-primary"
                                      size={16}
                                    />
                                  </DialogTrigger>
                                  <DialogContent
                                    className="w-5/12 h-5/12"
                                    onClick={() => alert(file.preview)}
                                  >
                                    <img
                                      src={file.preview}
                                      alt="selected"
                                      className="w-full h-full object-cover"
                                    />
                                  </DialogContent>
                                </Dialog>
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    )
                )}

                <div
                  {...getRootProps({
                    className:
                      "relative w-20 h-20 dropzone border border-dashed border-primary cursor-pointer",
                  })}
                  onClick={open} // Make the entire dropzone a button
                >
                  <input {...getInputProps()} />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <UploadCloud className="text-primary" size={20} />
                  </div>
                </div>

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </aside>
    </div>
  );
};

export default FileUpload;
