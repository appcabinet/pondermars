import fs from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

const contentDir = path.join(process.cwd(), "src", "notes");

export type Note = {
  title: string;
  description: string;
  published: string;
  updated: string;
  readingTime: string;
  tags: string[];
}

export async function getNote(fileName: string) {
  const filePath = path.join(contentDir, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content, frontmatter } = await compileMDX<Note>({
    source: fileContent,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter]
      },
      parseFrontmatter: true,
    }
  });
  return { content, frontmatter };

}

export async function getNotes() {
  const notes = fs.readdirSync(contentDir);
  const notesData = await Promise.all(notes.map(getNote));
  return notesData;
}
