import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import SearchBar from './components/search_bar'
import YTSearch from 'youtube-api-search'
const API_KEY = "AIzaSyCWexOCwrnwKeqZfj93lVOSrRJwSaqTK_E"
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail';
import _ from 'lodash'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('surfboards')
    }
    videoSearch(term) {
        YTSearch({ key: API_KEY, term: term }, (data) => {
            this.setState({
                videos: data,
                selectedVideo: data[0]
            })
        });
    }
    render() {
        const videoSearch = _.debounce((term) => {this.videoSearch(term)},300)
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <div>
                    <VideoDetail video={this.state.selectedVideo} />
                    <VideoList
                        onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
                        videos={this.state.videos} />
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />,
    document.querySelector('.container'));