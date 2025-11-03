const Notification = ({ message, error }) => {
  if (!message) return null
  const style = {
    color: error ? 'red' : 'green',
    background: 'lightgrey',
    border: 'solid',
    fontSize: 20,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  return <div style={style}>{message}</div>
}
export default Notification
