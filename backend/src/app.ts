import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import pageRoutes from "./routes/page.routes";
import mediaRoutes from "./routes/media.routes";
import blockRoutes from "./routes/block.routes";
import publicRoutes from "./routes/public.routes";
import settingsRoutes from "./routes/settings.routes";
import dashboardRoutes from "./routes/dashboard.routes";


const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "RenewCred CMS Backend Running 🚀",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/blocks", blockRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

export default app;