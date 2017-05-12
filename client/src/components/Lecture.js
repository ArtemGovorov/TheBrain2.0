// @flow

import React from 'react'
import YouTube from 'react-youtube'
import Introduction from './Introduction'
import Content from './Content'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import lessonWatchedMutationParams from '../../shared/graphql/mutations/lessonWatchedMutationParams';
import lessonWatchedMutationSchema from '../../shared/graphql/queries/lessonWatchedMutationSchema';

class Lecture extends React.Component {

  render () {

    if (this.props.data.loading) {
      return (<p>Loading...</p>)
    }

    if (this.props.data.error) {
      return (<p>Error...</p>)
    }

    return <div id="video">
      <Introduction />
      <Content />
      <LectureVideoWithRouter lesson={this.props.data.Lesson} />
    </div>
  }
}

export class LectureVideo extends React.Component {
  render () {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    }

    return (
      <YouTube
        videoId={this.props.lesson.youtubeId}
        opts={opts}
        onEnd={this._onEnd}
      />
    )
  }

  _onEnd = () => {
    this.props.lessonWatchedMutation()
    this.props.dispatch(push('/wellDone'))
  }
}

const query = gql`
    query Lesson {
        Lesson {
            _id, position, description, flashcardIds, youtubeId
        }
    }
`

const LectureVideoWithRouter = compose(
  graphql(lessonWatchedMutationSchema, lessonWatchedMutationParams),
  withRouter,
  connect()
)(LectureVideo)

export default graphql(query)(Lecture)

