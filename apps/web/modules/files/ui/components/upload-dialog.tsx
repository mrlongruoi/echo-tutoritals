"use client";

import { useState } from "react";
import { useAction } from "convex/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Button } from "@workspace/ui/components/button";
import {
    Dropzone,
    DropzoneContent,
    DropzoneEmptyState,
} from "@workspace/ui/components/dropzone";
import { api } from "@workspace/backend/_generated/api";

interface UploadDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onFileUploaded?: () => void;
}

export const UploadDialog = ({
    open,
    onOpenChange,
    onFileUploaded,
}: UploadDialogProps) => {
    const addFile = useAction(api.private.files.addFile);

    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const [isUploading, setIsUploading] = useState(false);

    const [uploadForm, setUploadForm] = useState({
        category: "",
        filename: "",
    })

    const handleFileDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];

        if (file) {
            setUploadedFiles([file]);

            if (!uploadForm.filename) {
                setUploadForm((prev) => ({
                    ...prev,
                    filename: file.name
                }))
            }
        }
    }

    const handleUpload = async () => {
        setIsUploading(true);
        try {
            const blob = uploadedFiles[0];

            if (!blob) {
                return;
            }

            const filename = uploadForm.filename || blob.name;

            await addFile({
                bytes: await blob.arrayBuffer(),
                filename,
                mimeType: blob.type || "text/plain",
                category: uploadForm.category
            })

            onFileUploaded?.();
            handleCancel();
        } catch (error) {
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    }

    const handleCancel = () => {
        onOpenChange(false);
        setUploadedFiles([]);
        setUploadForm({
            category: "",
            filename: "",
        })
    }

    return (
        <Dialog onOpenChange={onOpenChange} open={open}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        Tải lên tài liệu
                    </DialogTitle>
                    <DialogDescription>
                        Tải tài liệu lên cơ sở kiến ​​thức của bạn để tìm kiếm và truy xuất hỗ trợ AI
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="category">
                            Loại
                        </Label>
                        <Input
                            className="w-full"
                            id="category"
                            onChange={(e) => setUploadForm((prev) => ({
                                ...prev,
                                category: e.target.value
                            }))}
                            placeholder="Ví dụ: Tài liệu, hỗ trợ, sản phẩm..."
                            type="text"
                            value={uploadForm.category}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="filename">
                            Tên tập tin{" "}
                            <span className="text-muted-foreground text-xs">(không bắt buộc)</span>
                        </Label>
                        <Input
                            className="w-full"
                            id="filename"
                            onChange={(e) => setUploadForm((prev) => ({
                                ...prev,
                                filename: e.target.value
                            }))}
                            placeholder="Ghi đè tên tệp mặc định"
                            type="text"
                            value={uploadForm.filename}
                        />
                    </div>

                    <Dropzone
                        accept={{
                            "application/pdf": [".pdf"],
                            "text/csv": [".csv"],
                            "text/plain": [".txt"],
                        }}
                        disabled={isUploading}
                        maxFiles={1}
                        onDrop={handleFileDrop}
                        src={uploadedFiles}
                    >
                        <DropzoneEmptyState />
                        <DropzoneContent />
                    </Dropzone>
                </div>

                <DialogFooter>
                    <Button
                        disabled={isUploading}
                        onClick={handleCancel}
                        variant="outline"
                    >
                        Hủy bỏ
                    </Button>

                    <Button
                        onClick={handleUpload}
                        disabled={uploadedFiles.length === 0 || isUploading || !uploadForm.category}
                    >
                        {isUploading ? "Đang tải lên..." : "Tải lên"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}