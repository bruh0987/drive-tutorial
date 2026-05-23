export type DriveNode =
    | {
          id: string;
          name: string;
          type: "folder";
          modified: string;
          children: DriveNode[];
      }
    | {
          id: string;
          name: string;
          type: "doc" | "image" | "video" | "zip" | "pdf";
          size: string;
          modified: string;
      };

export const driveRoot: DriveNode = {
    id: "root",
    name: "My Drive",
    type: "folder",
    modified: "—",
    children: [
        {
            id: "work",
            name: "Work",
            type: "folder",
            modified: "May 18, 2026",
            children: [
                {
                    id: "projects",
                    name: "Projects",
                    type: "folder",
                    modified: "May 20, 2026",
                    children: [
                        {
                            id: "spec",
                            name: "Q3 Roadmap.pdf",
                            type: "pdf",
                            size: "1.2 MB",
                            modified: "May 20, 2026",
                        },
                        {
                            id: "design",
                            name: "Design System.doc",
                            type: "doc",
                            size: "340 KB",
                            modified: "May 19, 2026",
                        },
                        {
                            id: "assets",
                            name: "Assets",
                            type: "folder",
                            modified: "May 12, 2026",
                            children: [
                                {
                                    id: "hero",
                                    name: "hero-banner.png",
                                    type: "image",
                                    size: "2.4 MB",
                                    modified: "May 10, 2026",
                                },
                                {
                                    id: "logo",
                                    name: "logo.svg",
                                    type: "image",
                                    size: "12 KB",
                                    modified: "May 09, 2026",
                                },
                            ],
                        },
                    ],
                },
                {
                    id: "notes",
                    name: "Meeting Notes.doc",
                    type: "doc",
                    size: "82 KB",
                    modified: "May 15, 2026",
                },
                {
                    id: "budget",
                    name: "Budget 2026.doc",
                    type: "doc",
                    size: "210 KB",
                    modified: "May 02, 2026",
                },
            ],
        },
        {
            id: "personal",
            name: "Personal",
            type: "folder",
            modified: "Apr 28, 2026",
            children: [
                {
                    id: "photos",
                    name: "Photos",
                    type: "folder",
                    modified: "Apr 24, 2026",
                    children: [
                        {
                            id: "iceland",
                            name: "iceland.jpg",
                            type: "image",
                            size: "5.8 MB",
                            modified: "Apr 24, 2026",
                        },
                        {
                            id: "kyoto",
                            name: "kyoto.jpg",
                            type: "image",
                            size: "4.2 MB",
                            modified: "Apr 22, 2026",
                        },
                        {
                            id: "trip",
                            name: "trip-video.mp4",
                            type: "video",
                            size: "182 MB",
                            modified: "Apr 20, 2026",
                        },
                    ],
                },
                {
                    id: "tax",
                    name: "Taxes.pdf",
                    type: "pdf",
                    size: "890 KB",
                    modified: "Mar 11, 2026",
                },
            ],
        },
        {
            id: "archive",
            name: "Archive.zip",
            type: "zip",
            size: "1.4 GB",
            modified: "Feb 02, 2026",
        },
        {
            id: "readme",
            name: "README.doc",
            type: "doc",
            size: "8 KB",
            modified: "Jan 14, 2026",
        },
    ],
};

export function findPath(
    root: DriveNode,
    targetId: string,
): DriveNode[] | null {
    if (root.id === targetId) return [root];
    if (root.type !== "folder") return null;
    for (const child of root.children) {
        const sub = findPath(child, targetId);
        if (sub) return [root, ...sub];
    }
    return null;
}
