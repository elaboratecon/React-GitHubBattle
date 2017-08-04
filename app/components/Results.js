// Import React components
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import queryString from 'query-string'

// Import custom components
import api from '../utils/api'
import PlayerPreview from './PlayerPreview'
import Loading from './Loading'

let Profile = (props) => {
  let info = props.info

  return (
    <PlayerPreview
      avatar={info.avatar_url}
      username={info.login}>
      <ul>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li>{info.blog}</li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.shape({
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
    public_repos: PropTypes.number.isRequired
  })
}

let Player = (props) => (
  <div>
    <h1 className='header'>{props.label}</h1>
    <h3 style={{ textAlign: 'center' }}>Score: {props.score}</h3>
    <Profile info={props.profile} />
  </div>
)

class Results extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }
  componentDidMount () {
    let players = queryString.parse(this.props.location.search)
    api.battle([
      players.playerOneName,
      players.playerTwoName
    ]).then(function (results) {
      // Leaving this ES5 to better understand .bind(this)
      // Error checking
      if (results === null) {
        return this.setState(function () {
          return {
            error: 'ERROR: Check that both users exist on GitHub',
            loading: false
          }
        })
      }

      // If success
      this.setState(function () {
        return {
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false
        }
      })
    }.bind(this))
  }
  render () {
    let error = this.state.error
    let winner = this.state.winner
    let loser = this.state.loser
    let loading = this.state.loading

    if (loading === true) {
      return <Loading text='PREPARE FOR BATTLE' />
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }

    return (
      <div className='row'>
        <Player
          label='Winner'
          score={winner.score}
          profile={winner.profile}
        />

        <Player
          label='Loser'
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    )
  }
}

export default Results
