export const paths = {
  new: "new",
  pledges: "pledges"
};

export const isNew = url => {
  return url.includes(paths.new);
};
