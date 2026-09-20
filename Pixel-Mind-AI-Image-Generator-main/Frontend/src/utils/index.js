import FileSaver from "file-saver";
import { surpriseMePrompts } from "../constants/index.js";

export function getRandomPrompt(prmopt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);

  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prmopt) return getRandomPrompt(prompt);

  return randomPrompt;
}

export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo,`download-${_id}.jpg`)
}
