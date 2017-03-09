import React from 'react';
import YouTube from 'react-youtube';

export default class extends React.Component {
    render() {
        return <div>Placeholder for youtube video
        <TutorialVideo/></div>
    }
}

class TutorialVideo extends React.Component {
    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1
            }
        };

        return (
            <YouTube
                videoId="2g811Eo7K8U"
                opts={opts}
                onReady={this._onEnd}
            />
        );
    }

    _onEnd() {
        console.log("hello world");
    }
}