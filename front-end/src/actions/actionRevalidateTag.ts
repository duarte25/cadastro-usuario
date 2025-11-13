"use server";

import { revalidateTag } from "next/cache";

export default async function actionRevalidateTag(tag: string): Promise<void> {
  revalidateTag(tag);
}