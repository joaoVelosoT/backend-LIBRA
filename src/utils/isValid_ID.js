const isValidID = async (id) => {
  try {
    if (!id) {
      return false;
    }

    if (!Number(id)) {
      return false;
    }
    if (id <= 0) {
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = isValidID;
