module.exports = params => (req, res, next) => {
    const reqParamList = Object.keys(req.params);
    const hasAllRequiredParams = params.every(param =>
        reqParamList.includes(param)
    );
    if (!hasAllRequiredParams)
        return res
            .status(400)
            .send(
                `The following parameters are all required for this route: ${params.join(", ")}`
            );

    next();
};
