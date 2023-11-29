// @ts-nocheck
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DropResult } from "react-beautiful-dnd";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { UploadCloud, Eye, Trash } from "lucide-react";
import { toBase64 } from "@/utils";
import { Images } from "@/types/types";

interface FileWithPreview extends File {
  preview?: string;
}

type Props = {
  onUpload: (files: Images[]) => void;
  onDelete?: (file: Images) => void;
  onReorder?: (files: Images[]) => void;
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
  const { toast } = useToast();
  const [cover, setCover] = useState<string | null>(
    currentImagesWithPreview?.[0].preview || null
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
    console.log(files,'files')
    if (files?.length >= 1) {
      setCover(files[0].preview!);
    }
  }, [files]);

  const onDrop = async (acceptedFiles: File[]) => {
    console.log(files.length,'files.length')
    console.log(acceptedFiles.length,'acceptedFiles.length')
    if (files.length + acceptedFiles.length > 10) {
      console.log("Cannot add more than 10 images");
      toast({
        title: "Limit Exceed",
        description: "Cannot add more than 10 images",
        duration: 2500,
      });
      return;
    }
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
    onReorder!(newFiles);
    setFiles(reorderedFiles);
  };

  const handleDelete = (file: FileWithPreview) => {
    const updatedFiles = files.filter((f) => f !== file);
    setFiles(updatedFiles);
    if (onDelete) {
      onDelete({
        image: file.preview!,
        imageOrder: files.indexOf(file),
      });
    }
  };

  return (
    <div className="w-11/12 sm:w-full h-[60vh] sm:h-full m-auto ">
      <div className="relative border border-dashed border-primary w-full h-2/3  sm:h-[300px] my-4">
        {cover && (
          <Image
            src={cover}
            alt="Cover Image"
            // fill={true}
            width={300}
            height={300}
            className="absolute top-0 left-0 object-contain w-full h-full bg-white"
          />
        )}
      </div>

      <aside>
        {/* <h4 className="mb-2 text-sm font-semibold text-center">Images</h4> */}
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
                        key={file.size}
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
                           {file.preview ? (
  <Image
    src={file.preview}
    alt={file.name}
    width={300}
    height={300}
    className="object-cover w-full h-full"
  />
) : (
  <span>Image preview not available</span>
)}
                            {isHovered === file.name && (
                              <div className="absolute top-0 left-0 flex flex-col items-stretch justify-between text-white">
                                <button
                                  className="text-xs font-medium focus:outline-none bg-primary"
                                  onClick={() => setCover(file.preview!)}
                                >
                                  Set as cover
                                </button>
                                <button
                                  className="text-xs font-medium focus:outline-none"
                                  onClick={() => handleDelete(file)}
                                >
                                  <Trash className="text-red-600" size={16} />
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
                                            {file.preview ? (
                                              <Image
                                      src={file.preview}
                                      alt="selected"
                                      className="object-cover w-full h-full"
                                    />
) : (
  <span>Image preview not available</span>
)}
                                   
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
                  <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
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
