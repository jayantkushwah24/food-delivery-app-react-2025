import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    };
  }
  render() {
    const { name, contact } = this.props;
    const { count } = this.state;
    return (
      <>
        <h1>Name : {name}</h1>
        <h2>Contact : {contact}</h2>
        <h2>{count}</h2>
        <button
          onClick={() => {
            this.setState({
              count: count + 1,
            });
          }}
          type="submit"
        >Increase the count</button>
      </>
    );
  }
}
export default UserClass;
