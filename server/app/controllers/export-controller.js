const downloadFile = (req, res) => {
  try {
    const file = `${process.cwd()}/uploads/template.csv`;
    res.download(file);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  downloadFile,
};
