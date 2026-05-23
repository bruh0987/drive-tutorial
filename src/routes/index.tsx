import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
    Folder,
    FileText,
    Image as ImageIcon,
    Film,
    Archive,
    FileType,
    ChevronRight,
    Search,
    Upload,
    HardDrive,
} from "lucide-react";
import { type File, mockFiles } from "@/lib/mock-drive";

export const Route = createFileRoute("/")({
    component: Drive,
    head: () => ({
        meta: [
            { title: "Drive — Files" },
            {
                name: "description",
                content:
                    "Minimal dark-mode drive UI with nested folders and files.",
            },
        ],
    }),
});

function nodeIcon(file: File) {
    const base = "h-4 w-4 shrink-0";
    if (file.type === "folder")
        return (
            <Folder className={base} style={{ color: "var(--color-folder)" }} />
        );

    const extension = file.name.split(".").pop()?.toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(extension || ""))
        return (
            <ImageIcon
                className={base}
                style={{ color: "var(--color-file-img)" }}
            />
        );
    if (["mp4", "mov", "webm", "avi"].includes(extension || ""))
        return (
            <Film className={base} style={{ color: "var(--color-file-vid)" }} />
        );
    if (["zip", "rar", "7z", "tar", "gz"].includes(extension || ""))
        return (
            <Archive
                className={base}
                style={{ color: "var(--color-file-zip)" }}
            />
        );
    if (extension === "pdf")
        return (
            <FileType
                className={base}
                style={{ color: "var(--color-file-vid)" }}
            />
        );
    return (
        <FileText className={base} style={{ color: "var(--color-file-doc)" }} />
    );
}

function Drive() {
    const [currentFolder, setCurrentFolder] = useState<string | null>(null);
    const [query, setQuery] = useState("");

    const currentFiles = useMemo(() => {
        if (query.trim()) {
            return mockFiles.filter((file) =>
                file.name.toLowerCase().includes(query.toLowerCase()),
            );
        }
        return mockFiles.filter((file) => file.parent === currentFolder);
    }, [currentFolder, query]);

    const handleFolderClick = (folderId: string | null) => {
        setCurrentFolder(folderId);
        setQuery(""); // Clear search when navigating
    };

    const breadcrumbs = useMemo(() => {
        const path: File[] = [];
        let currentId = currentFolder;

        while (currentId !== null) {
            const folder = mockFiles.find((file) => file.id === currentId);
            if (folder) {
                path.unshift(folder);
                currentId = folder.parent;
            } else {
                break;
            }
        }

        return path;
    }, [currentFolder]);

    const handleUpload = () => {
        alert("Upload functionality would be implemented here");
    };

    return (
        <div className="dark min-h-screen bg-background text-foreground">
            <main className="mx-auto max-w-5xl">
                {/* Top bar */}
                <div className="sticky top-0 z-10 backdrop-blur bg-background/80 border-b border-border">
                    <div className="flex items-center gap-3 px-6 py-3">
                        <div className="flex items-center gap-2 shrink-0">
                            <div className="h-7 w-7 rounded-md bg-primary/15 grid place-items-center">
                                <HardDrive className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-medium tracking-tight">
                                Drive
                            </span>
                        </div>
                        <div className="relative flex-1 max-w-xl ml-2">
                            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search in Drive"
                                className="w-full rounded-lg bg-input/60 border border-border pl-9 pr-3 py-2 text-sm outline-none focus:border-ring focus:bg-input"
                            />
                        </div>
                        <StorageMeter />
                        <button
                            onClick={handleUpload}
                            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-accent transition-colors"
                        >
                            <Upload className="h-4 w-4" /> Upload
                        </button>
                    </div>

                    {/* Breadcrumbs */}
                    <nav className="px-6 pb-3 flex items-center gap-1 text-sm text-muted-foreground overflow-x-auto">
                        <button
                            onClick={() => handleFolderClick(null)}
                            className={
                                "px-2 py-1 rounded-md hover:bg-accent transition-colors " +
                                (!currentFolder ? "text-foreground font-medium" : "")
                            }
                        >
                            All Files
                        </button>
                        {breadcrumbs.length > 0 && (
                            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
                        )}
                        {breadcrumbs.map((folder, index) => {
                            const last = index === breadcrumbs.length - 1;
                            return (
                                <span
                                    key={folder.id}
                                    className="flex items-center gap-1"
                                >
                                    <button
                                        onClick={() =>
                                            handleFolderClick(folder.id)
                                        }
                                        className={
                                            "px-2 py-1 rounded-md hover:bg-accent transition-colors " +
                                            (last
                                                ? "text-foreground font-medium"
                                                : "")
                                        }
                                    >
                                        {folder.name}
                                    </button>
                                    {!last && (
                                        <ChevronRight className="h-3.5 w-3.5 opacity-60" />
                                    )}
                                </span>
                            );
                        })}
                    </nav>
                </div>

                {/* Content */}
                <div className="px-6 py-6">
                    {currentFiles.length === 0 ? (
                        <div className="text-center text-muted-foreground py-24 text-sm">
                            {query ? "No results found." : "This folder is empty."}
                        </div>
                    ) : (
                        <Section
                            files={currentFiles}
                            onOpen={handleFolderClick}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}

function StorageMeter() {
    return (
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card text-xs text-muted-foreground">
            <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
                <div className="h-full w-2/5 bg-primary/70" />
            </div>
            <span>6.1 / 15 GB</span>
        </div>
    );
}

function Section({
    files,
    onOpen,
}: {
    files: File[];
    onOpen: (id: string | null) => void;
}) {
    return (
        <section className="mb-8">
            <div className="rounded-xl border border-border overflow-hidden">
                <div className="grid grid-cols-[1fr_140px_120px] px-4 py-2 text-xs text-muted-foreground border-b border-border bg-card/40">
                    <span>Name</span>
                    <span className="hidden sm:block">Modified</span>
                    <span className="hidden sm:block text-right">Size</span>
                </div>
                <ul>
                    {files.map((file) => (
                        <li key={file.id}>
                            <button
                                onClick={() => {
                                    if (file.type === "folder") {
                                        onOpen(file.id);
                                    } else if (file.url) {
                                        window.open(file.url, "_blank");
                                    }
                                }}
                                className="w-full grid grid-cols-[1fr_140px_120px] items-center px-4 py-2.5 text-sm hover:bg-accent/50 transition-colors text-left border-b border-border last:border-0"
                            >
                                <span className="flex items-center gap-3 min-w-0">
                                    {nodeIcon(file)}
                                    <span className="truncate">
                                        {file.name}
                                    </span>
                                </span>
                                <span className="hidden sm:block text-muted-foreground text-xs">
                                    May 23, 2026
                                </span>
                                <span className="hidden sm:block text-muted-foreground text-xs text-right">
                                    {file.type === "folder" ? "—" : file.size}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

