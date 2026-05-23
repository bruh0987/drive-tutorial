export type File = {
  id: string;
  name: string;
  type: "file";
  url: string;
  parent: string;
  size: string;
  modified: Date;
};

export type Folder = {
  id: string;
  name: string;
  type: "folder";
  url?: string;
  parent: string | null;
  size?: string;
  modified: Date;
};

export const mockFolders: Folder[] = [
  {
    id: "root",
    name: "All Files",
    type: "folder",
    parent: null,
    modified: new Date("2025-01-01T00:00:00Z"),
  },
  {
    id: "1",
    name: "Documents",
    type: "folder",
    parent: "root",
    modified: new Date("2025-01-01T00:00:00Z"),
  },
  {
    id: "2",
    name: "Images",
    type: "folder",
    parent: "root",
    modified: new Date("2025-01-01T00:00:00Z"),
  },
  {
    id: "3",
    name: "Work",
    type: "folder",
    parent: "root",
    modified: new Date("2025-01-01T00:00:00Z"),
  },
  {
    id: "8",
    name: "Presentations",
    type: "folder",
    parent: "3",
    modified: new Date("2025-01-01T00:00:00Z"),
  },
];

export const mockFiles: File[] = [
  {
    id: "4",
    name: "Resume.pdf",
    type: "file",
    url: "/files/resume.pdf",
    parent: "1",
    size: "1.2 MB",
    modified: new Date("2024-01-01T00:00:00Z"),
  },
  {
    id: "5",
    name: "Project Proposal.docx",
    type: "file",
    url: "/files/proposal.docx",
    parent: "1",
    size: "2.5 MB",
    modified: new Date("2025-01-01T00:00:00Z"),
  },
  {
    id: "6",
    name: "Vacation.jpg",
    type: "file",
    url: "/files/vacation.jpg",
    parent: "2",
    size: "3.7 MB",
    modified: new Date("2025-01-01T00:00:00Z"),
  },
  {
    id: "7",
    name: "Profile Picture.png",
    type: "file",
    url: "/files/profile.png",
    parent: "2",
    size: "1.8 MB",
    modified: new Date("2025-01-01T00:00:00Z"),
  },
  {
    id: "9",
    name: "Q4 Report.pptx",
    type: "file",
    url: "/files/q4-report.pptx",
    parent: "8",
    size: "5.2 MB",
    modified: new Date("2025-01-01T00:00:00Z"),
  },
  {
    id: "10",
    name: "Budget.xlsx",
    type: "file",
    url: "/files/budget.xlsx",
    parent: "3",
    size: "1.5 MB",
    modified: new Date("2025-01-01T00:00:00Z"),
  },
];
