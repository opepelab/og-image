export type FileType = "png" | "jpeg";
export type Theme = "none" | "dark" | "light";

export interface ParsedRequest {
  sou: string;
  fileType: FileType;
  text: string;
  md: boolean;
  fontSize: string;
}
