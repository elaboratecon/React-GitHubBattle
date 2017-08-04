import React      from 'react'
import ReactDOM   from 'react-dom'
import PropTypes  from 'prop-types'

import styles from './index.css'

const USER_DATA = {
  name: 'Jason',
  username: 'elaboratecon',
  img: 'https://pbs.twimg.com/profile_images/816894289548427264/e-o_aEOV.jpg'
};

class Badge extends React.Component {
  render() {
    return (
      <div>
        <img
          src={this.props.user.img}
          alt='Avatar'
          style={{
            width: 100,
            height: 100
          }} />
        <h1>Name: {this.props.user.name}</h1>
        <h3>Username: {this.props.user.username}</h3>
      </div>
    )
  }
}

Badge.propTypes = {
  user: PropTypes.shape({
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }).isRequired
}

ReactDOM.render(
  <Badge user={USER_DATA} />,
  document.getElementById('app')
)
