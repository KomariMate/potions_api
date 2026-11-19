const renderErrorHandler = (res, err) => {
    return res.status(500).json({
      success: false,
      message: err.message || "INTERNAL SERVER ERROR!",
    });
}

module.exports = renderErrorHandler;