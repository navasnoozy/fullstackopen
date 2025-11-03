const Notification = ({ message }) => {
  if (!message) return null;

  const style = {
    border: "2px solid green",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "#e6ffe6",
    color: "green",
    fontSize: "16px",
  };

  return <div style={style}>{message}</div>;
};

export default Notification;
