export const checkExistingUsername = async (
  db,
  collection,
  getDocs,
  query,
  where,
  username
) => {
  const q = query(collection(db, "users"), where("username", "==", username));
  const snapshots = await getDocs(q);
  return snapshots.size > 0;
};
