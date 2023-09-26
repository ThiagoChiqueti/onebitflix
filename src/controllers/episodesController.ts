import { error } from "console";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export const episodesController = {
  //get /episodes/stream?videoUrl
  stream: async (req: Request, res: Response) => {
    const { videoUrl } = req.query;
    try {
      if (typeof videoUrl !== "string") {
        throw new Error("videoUrl must be of type string");
      }

      const filePath = path.join(__dirname, "..", "..", "uploads", videoUrl);
      const fileStat = fs.statSync(filePath);

      const range = req.headers.range; // bytes=

      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");

        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1;

        const chunkSize = end - start + 1;

        const file = fs.createReadStream(filePath, { start, end });

        const head = {
          "Content-Range": `bytes ${start}-${end}/${fileStat.size}`,
          "Accept-Ranges": "bytes",
          "Content-Lenght": chunkSize,
          "Content-Type": "video/mp4",
        };

        //206 representa conteúdo parcial

        res.writeHead(206, head);

        file.pipe(res);
      } else {
        //devolvendo o video todo caso não tenha o range setado na requisição
        const head = {
          "Content-Lenght": fileStat.size,
          "Content-Type": "video/mp4",
        };

        res.writeHead(200, head);

        fs.createReadStream(filePath).pipe(res);
      }
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
