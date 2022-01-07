export const response = (callback: any) => {
    return async (req: any, res: any) => {
        try {
            const result = await callback(req, res);
            res.status(200).send({ "message": result });
        } catch (error) {
            res.status(400).send({ "error": error });
        }
    }
}