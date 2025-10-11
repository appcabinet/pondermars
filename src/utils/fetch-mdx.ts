'use server';

import fs from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";

const contentDir = path.join(process.cwd(), "src", "notes");

export type Note = {
  title: string;
  description: string;
  published: string;
  updated: string;
  readingTime: string;
  tags: string[];
  coverImage?: string;
  redirectUrl?: string;
}

export async function getNote(fileName: string) {
  const filePath = path.join(contentDir, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content, frontmatter } = await compileMDX<Note>({
    source: fileContent,
    options: {
      parseFrontmatter: true,
    }
  });
  return { content, frontmatter, fileName };

}

export async function getNotes() {
  const notes = fs.readdirSync(contentDir);
  const notesData = await Promise.all(notes.map(getNote));
  return notesData;
}
