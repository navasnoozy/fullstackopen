

const Notification = ({ message }) => message
  ? <div style={{ border: '1px solid', padding: 10, marginBottom: 10 }}>{message}</div>
  : null
