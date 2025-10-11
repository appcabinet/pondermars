'use server';

import fs from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import { z } from "zod";

const contentDir = path.join(process.cwd(), "src", "notes");

const NoteSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  published: z.string(),
  updated: z.string(),
  readingTime: z.string(),
  tags: z.array(z.string()).default([]),
  coverImage: z.string().optional(),
  redirectUrl: z.string().optional(),
  imageAlt: z.string().optional(),
});

export type Note = z.infer<typeof NoteSchema>;

export async function getNote(fileName: string) {
  const filePath = path.join(contentDir, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content, frontmatter } = await compileMDX({
    source: fileContent,
    options: {
      parseFrontmatter: true,
    }
  });

  const validatedFrontmatter = NoteSchema.parse(frontmatter);

  return { content, frontmatter: validatedFrontmatter, fileName };

}

export type NoteData = Awaited<ReturnType<typeof getNote>>;

export async function getNotes(): Promise<NoteData[]> {
  const notes = fs.readdirSync(contentDir);
  const notesData = await Promise.all(notes.map(getNote));
  return notesData;
}
