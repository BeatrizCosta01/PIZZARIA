import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors';
import cors from 'cors';
import path from 'path';

import { router } from "./routes"
import fileUpload from 'express-fileupload'

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload({
    limits:{fileSize: 50 * 1024 * 1024}
}))
app.use(router);

// acessar url da imagem
app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error) {
        // Se for uma instância do tipo error
        res.status(400).json({
            error: err.message
        })
    }

    res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})

app.listen(3333, () => console.log("Servidor online!!!"))