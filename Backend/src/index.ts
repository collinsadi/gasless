// console.log(decryptedPrivateKey.toString(CryptoJS.enc.Utf8));

import express, { Request, Response, NextFunction } from "express";
const app = express();
import { ENVIRONMENT } from "./common/config/environment";
import { connectDb } from "./common/config/database";
import cors from "cors";
import transferRouter from "./modules/routes/transfer.router";

// App Security Configurations
// app.use(
//   cors((req: Request, callback: any) => {
//     const origin = req.header("Origin");
//     console.log(origin);
//     const isAllowed = origin === "https://example.com";

//     if (isAllowed) {
//       callback(null, { origin: true });
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   })
// );

app.use(cors());

//manual origin check using express middleware
// app.use((req: Request, res: Response, next: NextFunction) => {
//   const origin = req.header("Origin");
//   if (origin === "https://example.com") {
//     next();
//   } else {
//     res.status(403).send("Not allowed by CORS");
//   }
// });

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.disable("x-powered-by");

// Routes
app.use("/api", transferRouter);

// Welcome Message
app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Welcome to the Gasless Transfer API",
  });
});

// status check
app.get("*", (req: Request, res: Response) => {
  res.send({
    Time: new Date(),
    status: "running",
  });
});

// error check
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({
    status: false,
    message: "An unexpected error occurred",
    error: err.message,
  });
});

app.listen(ENVIRONMENT.APP.PORT, () => {
  console.log(
    `${ENVIRONMENT.APP.NAME} Running on http://localhost:${ENVIRONMENT.APP.PORT}`
  );

  connectDb();
});
