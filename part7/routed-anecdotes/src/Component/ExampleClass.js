import React from 'react'
export default class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }
  }
  render() {
    return <input value={this.state.value} onChange={e => this.setState({ value: e.target.value })} />
  }
}
