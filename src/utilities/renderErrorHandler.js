const renderErrorHandler = (res, err) => {
    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR!",
    });
}

module.exports = renderErrorHandler;