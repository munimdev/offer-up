import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DropResult } from "react-beautiful-dnd";

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { UploadCloud, Eye } from "lucide-react";

interface FileWithPreview extends File {
  preview?: string;
}

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isHovered, setIsHovered] = useState<string | null>(null);

  useEffect(() => {
    return () =>
      files.forEach((file) => URL.revokeObjectURL(file.preview || ""));
  }, [files]);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles((prev) => [
      ...prev,
      ...acceptedFiles.map((file: File) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
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

    setFiles(reorderedFiles);
  };

  return (
    <div className="">
      <div
        {...getRootProps({
          className:
            "dropzone flex flex-col justify-center items-center p-6 my-4 border-2 border-dashed rounded text-center cursor-pointer",
        })}
        onClick={open} // Make the entire dropzone a button
      >
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
        <UploadCloud className="text-gray-400 mt-6" size={40} />
      </div>
      <aside>
        <h4 className="mb-2 text-sm font-semibold">Images</h4>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex space-x-2"
              >
                {files.map((file, index) => (
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
                        className="relative w-24 h-24"
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
                            <button className="focus:outline-none bg-primary text-xs font-medium">
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
                              <DialogContent>
                                <img
                                  src={file.preview}
                                  alt="selected"
                                  className="max-w-full max-h-full"
                                />
                              </DialogContent>
                            </Dialog>
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
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
