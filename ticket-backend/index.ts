// api/index.ts
import { VercelRequest, VercelResponse } from "@vercel/node";
import app from "./src/server";

// This turns Express into a serverless handler
export default (req: VercelRequest, res: VercelResponse) => {
  return app(req as any, res as any);
};
