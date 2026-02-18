function SlotContainer({ data }) {
  const groupByDate = data.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {});
  const sortDate = Object.keys(groupByDate).sort();
  return <>SlotContainer</>;
}
export default SlotContainer;
