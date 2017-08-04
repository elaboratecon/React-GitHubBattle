// Import React components
import React from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'

// Import custom components
import api from '../utils/api'

// Stateless Functional Components
const SelectLanguage = props => {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

  return (
    <ul className='languages'>
      {languages.map((lang) => (
        <li
        // className={lang === this.state.selectedLanguage ? { color: 'red' } : null}
          className={lang === props.selectedLanguage ? 'test' : null}
          onClick={props.onSelect.bind(null, lang)}
          key={lang}>
          {lang}
        </li>
      ))}
    </ul>
  )
}

const RepoGrid = props => (
  <ul className='popular-list'>
    {props.repos.map(function (repo, index) {
      return (
        <li key={repo.id} className='popular-item'>
          <div className='popular-rank'>#{index + 1}</div>
          <ul className='space-list-items'>
            <li>
              <img
                className='avatar'
                src={repo.owner.avatar_url}
                alt={'Avatar for ' + repo.owner.login} />
            </li>
            <li><a href={repo.html_url}>{repo.name}</a></li>
            <li>@{repo.owner.login}</li>
            <li>{repo.stargazers_count} stars</li>
          </ul>
        </li>
      )
    })}
  </ul>
)

// Enforce PropTypes
SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

// Stateful Component
class Popular extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedLanguage: 'All',
      repos: null
    }

    this.updateLanguage = this.updateLanguage.bind(this)
  }
  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage)
  }
  // Left this section ES5 to better understand .bind(this)
  updateLanguage (lang) {
    this.setState(function () {
      return {
        selectedLanguage: lang,
        repos: null
      }
    })

    api.fetchPopularRepos(lang)
      .then(function (repos) {
        this.setState(function () {
          return {
            repos: repos
          }
        })
      }.bind(this))
  }
  render () {
    return (
      <div>
        <SelectLanguage
          selectedLanguage = {this.state.selectedLanguage}
          onSelect={this.updateLanguage} />
        {!this.state.repos
          ? <Loading text='DOWNLOADING' speed={100} />
          : <RepoGrid repos={this.state.repos} />}
      </div>
    )
  }
}

export default Popular
